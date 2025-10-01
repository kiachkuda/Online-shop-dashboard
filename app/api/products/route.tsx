// app/api/products/route.ts
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob'

import { ObjectId } from "mongodb";
import  path  from "path";
import { writeFile } from "fs/promises";
import { ProductTable } from "@/app/lib/definitions";


export async function clientDb(){
    const client = await clientPromise;
    if(!client) {
      throw new Error("Failed to connect to MongoDB client");
    }else{
      console.log("MongoDB Client connected");
    }
    const db = client.db("mtush-db"); // change to your DB name
    return db;
}

// GET /api/products
export async function GET() {
     try {
    const db = await clientDb();
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
 
}

// POST /api/products
export async function POST(req: Request) {
  try {
    const formData= await req.formData();
    const db = await clientDb();

    const name = formData.get('name') as string;
    const description = formData.get('description')  as string;
    const brand = formData.get('brand');
    const gender = formData.get('gender');
    const category = formData.get('category');
    const buyingPrice = formData.get('buyingPrice');
    const price = formData.get('price');
    const discount = formData.get('discount');
    const sizes = formData.getAll('sizes') as string[];
    const colors = formData.getAll('colors') as string[];
    const images = formData.getAll('images') as File[];


      // Check if a file is received
  if (!images || images.length === 0) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

     


    if(!name || !brand || !price || !buyingPrice) {
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

    const newProduct: ProductTable = {
      _id: new ObjectId(),
      name: name as string || "",
      description: description as string || "",
      brand: brand as string || "",
      gender: (["Unisex", "Men", "Women", "Kids"].includes(gender as string) ? (gender as "Unisex" | "Men" | "Women" | "Kids") : "Unisex"),
      category: category as string || "",
      price: parseFloat(price as string) || 0,
      buyingPrice: parseFloat(buyingPrice as string) || 0,
      discount: parseFloat(discount as string) || 0,
      sizes: sizes as string[] || [],
      colors: colors as string[] || [],
      images: images.length > 0 ? images.map((file) => file.name) : [],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    //
    

    const result = await db.collection("products").insertOne(newProduct);
    return NextResponse.json({ message: "Product created", productId: result.insertedId }, { status: 201 });
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

