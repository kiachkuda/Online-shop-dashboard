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

const sql = postgres(process.env.POSTGRESS_URL!, {ssl: 'require'});

export default async function executeQuery({
  query,
  values = []
}: { query: string; values?: any[] }): Promise<any> {
  try {
    const [results] = await pool.execute(query, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// paginations
export async function getProductsByPage(req: NextRequest) {
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
            p.id, p.name, p.price, p.description, p.feature, p.sku, p.discount_price, p.color, p.size,
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