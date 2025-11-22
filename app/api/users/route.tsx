import executeQuery from '@/app/lib/data';

import {NextResponse, NextRequest} from 'next/server';

import bcrypt from "bcryptjs";
import { User } from "@/app/lib/definitions";
import nodemailer from "nodemailer";
import cookie from "cookie";


export  async function GET() {
  
    try {
      const users = await executeQuery({
        query: 'SELECT * FROM users LIMIT 10',
        values: [],
      });
      
      return NextResponse.json( {users} );
    } catch (error) {

      return NextResponse.json({ error: 'Error fetching users' });
    }
 
}


export async function POST(req: NextRequest) {
  try {

    const body = await req.json(); 

    const { firstname, lastname, email, phone, password } = body;

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
    const existingUser = await executeQuery({
      query : "SELECT * FROM users where email = ?",
      values: [email]
    });

   

    const otpExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours from now
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    

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

    //await db.collection("users").insertOne(user);
    let name = firstname + " " + lastname;
    await executeQuery({
      query : "INSERT users(email, phone, password_hash, name, otp_code, otp_expires_at) values(?, ?, ?, ?, ?, ?)",
      values : [email, phone, hashedPassword, name, otp, otpExpiry]
    })
    const res = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

    await transporter.sendMail(mailOptions);

    res.headers.set("set-cookie", cookie.serialize("email", email, 
      { 
        path: '/', 
        httpOnly: true, 
        maxAge: 4 * 60 * 60 
      }));

    return res;

  } catch (error) {
    console.error("Sign Up Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error },
      { status: 500 }
    );
  }
}
