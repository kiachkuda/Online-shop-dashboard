import {sql} from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {

    try{
        const {id} = await context.params;
        const user = await sql`SELECT id, email, phone, name, FROM users WHERE id = ${id} AND is_verified = ${true}`;
        
        if(!user){
            return NextResponse.json({error:"User not found"}, {status:404});
        }
        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json({error:error}, {status:500})
    }
}