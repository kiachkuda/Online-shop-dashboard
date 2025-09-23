// app/api/users/route.ts
import { NextResponse } from "next/server";
import { clientDb } from "../products/route";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { User } from "@/app/lib/definitions";
import nodemailer from "nodemailer";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    const db = await clientDb();
    const body = await req.json(); // 👈 parse JSON

    const { firstname, lastname, email, password } = body;

    if (!firstname || !lastname) {
      return NextResponse.json(
        { error: "Firstname and lastname are required" , errorType: "name" },
        { status: 400 }
      );
    }
    

    if (!password) {
      return NextResponse.json({ error: "Invalid Password", erroType:'password' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters", errorType: "password" },
        { status: 400 }
      );
    }


    if (!email) {
      return NextResponse.json({ error: "Email field required", errorType: "email" }, { status: 400 });
    }
    // Check if user with the same email already exists
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        
        { error: "Email already in use", errorType: "email" },
        { status: 400 }
      );
    }

    const otpExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user : User = {
      _id: new ObjectId(),
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      verified: false,
      otp: otp,
      otpExpiry: otpExpiry,
      resetPasswordToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    /* Send registration email to user */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Mtushadmin!",
      text: `Hello ${firstname},\n\nThank you for registering. Your OTP is: ${otp}\n\nBest regards,\nMtushadmin Team`,
    };

    await transporter.sendMail(mailOptions);

    await db.collection("users").insertOne(user);



    const res = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
    res.headers.set("set-cookie", cookie.serialize("email", email, { path: '/' , httpOnly: true, maxAge: 4 * 60 * 60 }));

    return res;

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
