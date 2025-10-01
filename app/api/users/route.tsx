// app/api/users/route.ts
import { NextResponse } from "next/server";
import { clientDb } from "../products/route";


export async function GET() {

  try{
    const db = await clientDb();
    const users = await db.collection("users").find({role:'user'})
                  .project({firstname:1,lastname:1,email:1})
                  .toArray();
    return NextResponse.json(users);
  }catch(error){
    return NextResponse.json({error:error})
  }

}