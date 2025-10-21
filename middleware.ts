// middleware.ts
export const runtime = "nodejs";  // ✅ Force Node.js runtime
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


const roleAccess: Record<string, string[]> = {
  admin: ['/dashboard', '/admin'],
  user: ['/home'],
};


export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Ensure user is admin
    if (typeof decoded === 'object' && decoded.role === 'admin') {
      return NextResponse.next(); // allow access
    }

    //if the session has expired
    if(typeof decoded === 'object' && decoded.exp && Date.now() >= decoded.exp * 1000){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If not admin, redirect or show unauthorized page
    return NextResponse.redirect(new URL('/login', req.url));


  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply middleware only on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', '/home/:path*'],
};
