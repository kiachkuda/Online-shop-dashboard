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
  
}

export async function insertProduct(){
  
}