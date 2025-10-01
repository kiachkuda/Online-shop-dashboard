import {cookies} from "next/headers";
import { NextResponse } from "next/server";
import {clientDb} from "../../products/route";

export async function POST(req: Request) {
  try {
    const db = await clientDb();
    const body = await req.json(); 
    const { otp } = body;

    const cookieStore = await cookies();
      const email = cookieStore.get("email")?.value;
    
    if (!email) {
      return NextResponse.json({ error: "No email in cookie" }, { status: 400 });
    }

    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.verified === true) {
      return NextResponse.json({ error: "User already verified" }, { status: 400 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
    if (user.otpExpiry && new Date() > new Date(user.otpExpiry)) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }
    const res = await db.collection("users").updateOne(
      { email: email },
      { $set: { verified: true, otp: null, otpExpiry: null } }
    );

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