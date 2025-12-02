import { NextRequest, NextResponse } from "next/server";

import {sql} from "@/app/lib/data";


// Get /api/products/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params;
    const product = await sql`
  SELECT 
    P.id,
    B.name AS brand,
    C.name AS category,
    P.name,
    P.description,
    P.colors,
    P.sizes,
    P.gender,
    P.material,
    P.price,
    P.sku,
    P.discount_price,
    P.feature,
    P.stock_quantity,
    P.imageUrls
  FROM products AS P
  INNER JOIN brands AS B ON P.brand_id = B.id
  INNER JOIN categories AS C ON P.category_id = C.id
  WHERE P.sku = ${id};
`;


    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product " + error }, { status: 500 });
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
