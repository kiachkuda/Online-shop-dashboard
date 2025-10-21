import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { clientDb } from "../../products/route";


export async function POST(req: Request) {
  try {

    const db =  await clientDb();
    const { code, newPassword } = await req.json();

    if (!code || !newPassword) {
      return NextResponse.json(
        { message: "Code and new password are required" },
        { status: 400 }
      );
    }

    // Ensure DB is connected
    const user = await db.collection('users').findOne({
      resetCode: code,
      resetCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

   

    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { password: password_hash, resetCode: null, resetCodeExpiry: null } }
    );

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