import { NextRequest, NextResponse } from "next/server";
import { clientDb } from "../../products/route";


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {

    try{
        const db = await clientDb();
        const {id} = await context.params;
        const user = await db.collection("users").findOne(
            { _id: { $oid: id } },
            { projection: { firstname:1, lastname:1, email:1, role:1 } }
        );
        if(!user){
            return NextResponse.json({error:"User not found"}, {status:404});
        }
        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json({error:error}, {status:500})
    }
}