import { NextRequest, NextResponse } from "next/server";
import {clientDb} from "@/app/api/products/route";
import { ObjectId } from "mongodb";


// Get /api/products/:id
export async function GET(
  req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
    const db = await clientDb();
    const {id} = await context.params;
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });  
    }
    return NextResponse.json(product, { status: 200 });
   } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const db = await clientDb();
    const {id} = await context.params;

    console.log("Received request to delete product with ID:", id);

    const res = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    if ((res).deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });

   } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}


// PUT /api/products/:id
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = await clientDb();

    const formData = await req.formData();
    const updateData: any = {
      description: formData.get("description"),
      price: Number(formData.get("price")),
      discount: Number(formData.get("discount")),
      available: formData.get("available") === "true",
    };

    const res = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (res.modifiedCount === 0) {
      return NextResponse.json({ error: "No product updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
