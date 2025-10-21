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
    user.password_hash = await bcrypt.hash(newPassword, salt);

    // Clear reset fields
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
