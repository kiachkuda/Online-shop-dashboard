import { NextRequest, NextResponse } from "next/server";

import {sql} from "@/app/lib/data";

export async function GET(res : NextResponse) {
    try {
        const featured_products = await sql`
            SELECT * 
            FROM products 
            WHERE is_featured = true 
                AND stock_quantity > 0
            ORDER BY featured_position ASC
            LIMIT 
        `;

        const trending_products = await sql`
            SELECT *, (views_7d * 0.4 + orders_7d * 0.6) AS trend_score
            FROM products
            WHERE stock_quantity > 0
            ORDER BY trend_score DESC
            LIMIT 4;
        `;

        const new_arrival_products = await sql`
            SELECT * 
            FROM products 
            WHERE stock_quantity > 0
                AND created_at >= NOW() - INTERVAL '7 days'
            ORDER BY created_at DESC
            LIMIT 4;
        `;

        return NextResponse.json({
            featured : featured_products,
            trending : trending_products,
            arrival : new_arrival_products,
        }, {status : 200})

    }catch(error){
        console.log(error);
        console.error(error)
        NextResponse.json({ message: 'Internal Server Error' }, {status : 500});
    }
   

}