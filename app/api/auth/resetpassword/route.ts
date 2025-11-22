import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import executeQuery from "@/app/lib/data";

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


    const result =  await executeQuery({
      query : "SELECT id, user_id, reset_code, expires_at FROM password_resets where used = ? AND reset_code = ? AND expires_at > ? LIMIT 1",
      values : [false, code, Date.now()]
    })

    const user = result[0];

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired code"},
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

   
    await executeQuery({
      query : "UPDATE users SET password_hash = ? WHERE id = ? ",
      values: [password_hash, user.user_id]
    })

    await executeQuery({
      query : "UPDATE password_resets SET used = ? WHERE id = ? ",
      values: [password_hash, user.id]
    })

    

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