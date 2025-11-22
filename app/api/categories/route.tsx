import { NextRequest, NextResponse } from "next/server";


import executeQuery from "@/app/lib/data";

export async function GET(req: NextRequest) {
    try {
        const results = await executeQuery({ query: "SELECT * FROM categories", values: [] });
        return NextResponse.json({
            results
        })
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
     }
}