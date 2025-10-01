import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { clientDb } from '../../products/route';
import cookie  from 'cookie';


export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Database connection
        const db = await clientDb();

        // Find user by email
        const user = await db.collection('users').findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: 'Email or Password is incorrect'}, { status: 401 });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Email or Password is incorrect' }, { status: 401 });
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        
        // Generate JWT
        const token = jwt.sign(
            { 
                userId: user._id.toString(), 
                email: user.email, 
                role:user.role }, 
                JWT_SECRET, { expiresIn: '1h' }
            );
           
        // Set JWT as HttpOnly, Secure cookie
        const response = NextResponse.json({ message: 'Authentication successful' });

        // HttpOnly, Secure, SameSite cookie settings
        response.headers.set('set-cookie', cookie.serialize('token', token, 
            {
            httpOnly: true, // Cookie cannot be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: 'strict', // Avoid CSRF attacks
            maxAge: 60 * 60, // 1 hour expiration
            path: '/', // Cookie is accessible throughout the site
        } )); 

        return response;

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

}


export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ user: decoded });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}


