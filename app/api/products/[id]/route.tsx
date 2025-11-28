import { NextRequest, NextResponse } from "next/server";

import {sql} from "@/app/lib/data";


// Get /api/products/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params;
    const product = sql `SELECT P.id, B.name as brand, C.name as category, P.name, P.description, P.colors, P.sizes, P.gender, P.material, P.price, P.sku, P.discount_price, P.stock_quantity, P.imageUrls  
    FROM products as P inner join brands as B ON P.brand_id = B.id inner join categories as C ON C.id = P.category_id WHERE P.sku=${id}
    `

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

    const { id } = await context.params;

    const res = await sql `DELETE FROM products WHERE id = ${id} ?`;
    

    if (!res) {
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


    const formData = await req.formData();
    const description = String(formData.get("description"));
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const stock = Number(formData.get("stock"));
    const features =  formData.get("features");
    const updatedAt = new Date();


   const res = sql `UPDATE products  SET description = ${description}, price = ${price}, discount_price =${discount}, stock_quantity =${stock}, updatedAt=${updatedAt}WHERE id =${id}`

  return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
} catch (err) {
  console.error(err);
  return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
}
}
