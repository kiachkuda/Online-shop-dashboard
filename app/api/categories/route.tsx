import { NextRequest, NextResponse } from "next/server";


import {sql} from "@/app/lib/data";

export async function GET(req: NextRequest) {
    try {
        const results = await sql`SELECT * FROM categories`;
        return NextResponse.json({
            results
        })
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
     }
}