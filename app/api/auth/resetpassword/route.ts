import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {sql} from "@/app/lib/data";

export async function POST(req: Request) {
  try {
    const { code, newPassword } = await req.json();

    if (!code || !newPassword) {
      return NextResponse.json(
        { message: "Code and new password are required" },
        { status: 400 }
      );
    }

    if (!newPassword) {
          return NextResponse.json({ error: "Invalid Password", erroType:'password' }, { status: 400 });
        }
        
        if (newPassword.length < 6) {
          return NextResponse.json(
            { error: "Password must be at least 6 characters", errorType: "password" },
            { status: 400 }
          );
        }


    const result =  await sql`SELECT id, user_id, reset_code, expires_at FROM password_resets where used = ${false} AND reset_code = ${code} AND expires_at > ${Date.now()} LIMIT 1`;
     

    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired code"},
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

   
    await sql`UPDATE users SET password_hash = ${password_hash} WHERE id = ${ user.user_id} `;
      
    await sql`UPDATE password_resets SET used = ${true} WHERE id =${user.id} `
      

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}