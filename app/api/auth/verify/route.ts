import {cookies} from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import executeQuery from '@/app/lib/data';

export async function POST(req: NextRequest) {
  try {
   
    const body = await req.json(); 
    const { otp } = body;

    const cookieStore = await cookies();
      const email = cookieStore.get("email")?.value;
    
    if (!email) {
      return NextResponse.json({ error: "No email in cookie" }, { status: 400 });
    }

    const result = await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email]
    });
    const user = result[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.is_verified === true) {
      return NextResponse.json({ error: "User already verified" }, { status: 400 });
    }
    console.log(user.otp_code)
    if (user.otp_code != otp) {
      
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otp_Expires_at && new Date() > new Date(user.otp_Expires_at)) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }
    const res = await executeQuery({
      query : "UPDATE users SET is_verified = ?, otp_code = ?, otp_expires_at = ? WHERE email = ?",
      values: [true, null, null, email]
    })

    if (res.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to verify user" }, { status: 500 });
    }else{
        (await cookies()).delete("email");
    }

    return NextResponse.json(
      { message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}