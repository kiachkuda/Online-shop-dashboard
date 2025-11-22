// app/api/products/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob'

import { ObjectId } from "mongodb";
import  path  from "path";
import { writeFile } from "fs/promises";
import { ProductTable } from "@/app/lib/definitions";
import executeQuery, { getProductsByPage } from "@/app/lib/data";




// GET /api/products
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
      const limit = parseInt(url.searchParams.get('limit') || '10', 10) || 10;
      const offset = (page - 1) * limit;
      const [totalResults] = await executeQuery({query: 'SELECT COUNT(*) as count FROM products'});
  
      // Filters
      const brand = url.searchParams.get('brand');
      const category = url.searchParams.get('category');
      const gender = url.searchParams.get('gender');
      const min_price = url.searchParams.get('min_price');
      const max_price = url.searchParams.get('max_price');
      const sort = url.searchParams.get('sort');
  
      // Base query + joins for readability
      let baseQuery = `
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        JOIN categories c ON p.category_id = c.id
        WHERE 1 = 1
      `;
  
      const params: any[] = [];
  
      // Add filters dynamically
      if (brand) {
        baseQuery += " AND b.name = ?";
        params.push(brand);
      }
  
      if (category) {
        baseQuery += " AND c.name = ?";
        params.push(category);
      }
  
      if (gender) {
        baseQuery += " AND p.gender = ?";
        params.push(gender);
      }
  
      if (min_price) {
        baseQuery += " AND p.price >= ?";
        params.push(parseFloat(min_price));
      }
  
      if (max_price) {
        baseQuery += " AND p.price <= ?";
        params.push(parseFloat(max_price));
      }
  
      // Sorting
      let orderBy = "p.created_at DESC"; // default sort: newest first
      if (sort) {
        if (sort === "price_asc") orderBy = "p.price ASC";
        else if (sort === "price_desc") orderBy = "p.price DESC";
        else if (sort === "latest") orderBy = "p.created_at DESC";
        else if (sort === "oldest") orderBy = "p.created_at ASC";
      }
  
      try {
          const results = await executeQuery({
              query :  `
              SELECT 
              p.id, p.name, p.price, p.description, p.feature, p.sku, p.discount_price, p.colors, p.sizes,
              p.gender, p.stock_quantity,  p.imageUrls,
              b.name AS brand, c.name AS category
              ${baseQuery} ORDER BY ${orderBy} LIMIT ? OFFSET ?
              `,
              values :  [...params, limit, offset]
          });
  
          const totalCount = totalResults && (totalResults.count ?? (totalResults['COUNT(*)'] ?? 0));
          return NextResponse.json({
              current_page: page,
              total_pages: Math.ceil(Number(totalCount) / limit),
              total_results: Number(totalCount),
              filters: { brand, category, gender, min_price, max_price, sort },
              results
          });
      } catch (error) {
          return NextResponse.json({ error: String(error) }, { status: 500 });
      }
}

// Generate a sku from name
function generateSku(name : string) {
   let sku = name.trim().toUpperCase().replace(/\s+/g, '-');
   sku += '-' + Math.floor(1000 + Math.random() * 9000);
   return sku;
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const formData= await req.formData();
    

    const name = formData.get('name') as string;
    const description = formData.get('description')  as string;
    const material = formData.get('material')  as string;
    const feature = formData.get('feature')  as string;
    const brand_id = formData.get('brand');
    const gender = formData.get('gender');
    const category_id = formData.get('category');
    const buyingPrice = formData.get('buyingPrice');
    const price = formData.get('price');
    const discount = formData.get('discount');
    const stock_quantity = formData.get('stock');
    const sizes = formData.getAll('sizes') as string[];
    const colors = formData.getAll('colors') as string[];
    const images = formData.getAll('images') as File[];


      // Check if a file is received
  if (!images || images.length === 0) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }


    if(!name || !brand_id || !price || !buyingPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If price is not a number
    if (isNaN(Number(price)) || isNaN(Number(buyingPrice))) {
      return NextResponse.json(
        { error: "Price and Buying Price must be numbers" },
        { status: 400 }
      );
    }

    // Save images to Vercel Blob in production, or to local server in development
    let imageUrls: string[] = [];
    if (process.env.NODE_ENV === "production") {
      imageUrls = await saveImagesToVercel(images);
    } else {
      await saveImages(images);
      imageUrls = images.map((file) => `/uploads/${file.name}`);
    }

   
    let sku = generateSku(name);
    const result = executeQuery({
           query: `INSERT INTO products (name, brand_id, category_id, sku, description, material, colors,
            gender, sizes, price, feature, discount_price, stock_quantity, imageUrls 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            values : [
                name, 
                brand_id, 
                category_id, 
                sku, 
                description, 
                material || null, 
                colors, 
                gender, 
                sizes, 
                price,
                feature || null, 
                discount, 
                stock_quantity,
                JSON.stringify(imageUrls) 
            ]
          }
        );
   
   


    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// Function to save images to the server
async function saveImages(images: File[]) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await Promise.all(images.map(async (image) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, image.name);
    await writeFile(filePath, buffer);
  }));
}

export async function saveImagesToVercel(images: File[]) {
  const uploadedUrls: string[] = [];

  for (const image of images) {
    // Upload to Vercel Blob
    const blob = await put(image.name, image, {
      access: "public",          // public URL
      addRandomSuffix: true,     // avoids overwriting files
    });

    uploadedUrls.push(blob.url); // Store the URL (save in DB later)
  }

  return uploadedUrls;
}

