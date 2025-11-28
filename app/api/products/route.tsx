// app/api/products/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob'

import  path  from "path";
import { writeFile } from "fs/promises";

import  { sql, getProductsByPage } from "@/app/lib/data";


// GET /api/products
export async function GET(req: NextRequest) {
  getProductsByPage(req);
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

    // Normalize form values to primitive types before passing to the sql tagged template
    const brand_id_str = brand_id ? String(brand_id) : null;
    const category_id_str = category_id ? String(category_id) : null;
    const gender_str = gender ? String(gender) : null;
    const buyingPriceNum = Number(buyingPrice);
    const priceNum = Number(price);
    const discountNum = discount ? Number(discount) : null;
    const stock_quantity_num = stock_quantity ? Number(stock_quantity) : null;
    const colorsJson = JSON.stringify(colors);
    const sizesJson = JSON.stringify(sizes);
    const imageUrlsJson = JSON.stringify(imageUrls);

    const result = await sql`INSERT INTO products (name, brand_id, category_id, sku, description, material, colors,
            gender, sizes, price, feature, discount_price, stock_quantity, imageUrls 
        ) VALUES  (
                ${name}, 
                ${brand_id_str}, 
                ${category_id_str}, 
                ${sku}, 
                ${description}, 
                ${material || null}, 
                ${colorsJson}, 
                ${gender_str}, 
                ${sizesJson}, 
                ${priceNum},
                ${feature || null}, 
                ${discountNum}, 
                ${stock_quantity_num},
                ${imageUrlsJson} 
            )`;
        
   
   


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

