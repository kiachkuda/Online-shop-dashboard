

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { clientDb } from "../../products/route";


export async function POST(req: NextRequest) {
  try {
    const db = await clientDb();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email not registered" }, { status: 403 });
    }

    // Generate a 6-digit code
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Save to user record
    user.resetCode = verificationCode;
    user.resetCodeExpiry = Date.now() + 15 * 60 * 1000; // expires in 15 min
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { resetCode: user.resetCode, resetCodeExpiry: user.resetCodeExpiry } }
    );

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Password Reset Verification Code",
      text: `Your verification code is: ${verificationCode} click on the link to reset your password: http://192.168.0.104:3000/auth/resetPassword. This code will expire in 15 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Verification code sent to your email.",
    });
  } catch (err) {
    console.error("Error in forgot-password route:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}