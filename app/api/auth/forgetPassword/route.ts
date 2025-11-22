

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

import executeQuery from "@/app/lib/data";


export async function POST(req: NextRequest) {
  try {


    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // const user = await db.collection('users').findOne({ email });

    const result = await executeQuery({
      query : "SELECT * FROM users WHERE email = ?",
      values : [email]
    });

    const user = result[0];
    
    if (!user) {
      return NextResponse.json({ message: "Email not registered" }, { status: 403 });
    }


    // Generate a 6-digit code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 4 * 60 * 1000);; // expires in 15 min
    

    const res = await executeQuery({
      query : "SELECT * FROM password_resets WHERE user_id = ?",
      values: [user.id]
    })

    if(res) {
        await executeQuery({
          query : "UPDATE password_resets SET reset_code = ?, expires_at = ? WHERE user_id = ?",
          values : [verificationCode, expiresAt, user.id ]
        })
    }else{
       await executeQuery({
        query : "INSERT into password_resets(user_id, reset_code, expires_at) values(?, ?, ?)",
        values : [user.id, verificationCode, expiresAt]
      })
    }

   

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
      text: `Your verification code is: ${verificationCode} click on the link to reset your password: http://192.168.0.106:3000/auth/resetPassword. This code will expire in 15 minutes.`,
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