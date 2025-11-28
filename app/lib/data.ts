import mysql from 'mysql2/promise';
import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const sql = postgres(process.env.POSTGRESS_URL!, {ssl: 'require'});


// export default async function executeQuery({
//   query,
//   values = []
// }: { query: string; values?: any[] }): Promise<any> {
//   try {
//     const [results] = await pool.execute(query, values);
//     return results;
//   } catch (error) {
//     console.error('Database query error:', error);
//     throw error;
//   }
// }

// paginations
export async function getProductsByPage(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  // Get total products count
  const totalResults = await sql`
      SELECT COUNT(*)::int AS count 
      FROM products
  `;
  const totalCount = totalResults[0]?.count ?? 0;

  // Filters
  const brand = url.searchParams.get("brand");
  const category = url.searchParams.get("category");
  const gender = url.searchParams.get("gender");
  const min_price = url.searchParams.get("min_price");
  const max_price = url.searchParams.get("max_price");
  const sort = url.searchParams.get("sort");

  // Base query
  let whereClauses: any[] = [];
  let params: any[] = [];

  if (brand) whereClauses.push(sql`b.name = ${brand}`);
  if (category) whereClauses.push(sql`c.name = ${category}`);
  if (gender) whereClauses.push(sql`p.gender = ${gender}`);
  if (min_price) whereClauses.push(sql`p.price >= ${Number(min_price)}`);
  if (max_price) whereClauses.push(sql`p.price <= ${Number(max_price)}`);

  // Combine WHERE dynamically
  let whereQuery = sql``;
  if (whereClauses.length > 0) {
    whereQuery = sql`WHERE ${whereClauses[0]}`;
    for (let i = 1; i < whereClauses.length; i++) {
      whereQuery = sql`${whereQuery} AND ${whereClauses[i]}`;
    }
  }

  // Sorting (ORDER BY cannot be parameterized, so we sanitize manually)
  let orderBy = sql`p.created_at DESC`;
  if (sort === "price_asc") orderBy = sql`p.price ASC`;
  else if (sort === "price_desc") orderBy = sql`p.price DESC`;
  else if (sort === "oldest") orderBy = sql`p.created_at ASC`;

  try {
    const results = await sql`
      SELECT
        p.id,
        p.name,
        p.price,
        p.description,
        p.feature,
        p.sku,
        p.discount_price,
        p.color,
        p.size,
        p.gender,
        p.stock_quantity,
        p.imageUrls,
        b.name AS brand,
        c.name AS category
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      ${whereQuery}
      ORDER BY ${orderBy}
      LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json({
      current_page: page,
      total_pages: Math.ceil(totalCount / limit),
      total_results: totalCount,
      filters: { brand, category, gender, min_price, max_price, sort },
      results,
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function insertProduct(){
  
}