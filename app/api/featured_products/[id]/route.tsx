import { NextRequest, NextResponse } from "next/server";

import {sql} from "@/app/lib/data";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
)
{
    try{
        const { id } = await context.params;
        const { type } = await req.json();

        let result;

        if(type == 'view') {
            result = await sql`
                    UPDATE products
                    SET views_7d = views_7d + 1,
                        updated_at = NOW()
                    WHERE id = ${id}
                    RETURNING id, views_7d
                `;
        }else if(type== 'order') {
            result = await sql`
            UPDATE products
            SET orders_7d = orders_7d + 1,
                updated_at = NOW()
            WHERE id = ${id}
            RETURNING id, orders_7d
      `;
        }

        return NextResponse.json(result);
    }catch(error) {
        console.error(error);
        return NextResponse.json({error: 'Failed ' + error})
    }
    


}