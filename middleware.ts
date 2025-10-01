// middleware.ts
export const runtime = "nodejs";  // ✅ Force Node.js runtime
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', req.url));
  }else{
    console.log("Token found in cookies:", token);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Ensure user is admin
    if (typeof decoded === 'object' && decoded.role === 'admin') {
      return NextResponse.next(); // allow access
    }

    // If not admin, redirect or show unauthorized page
    return NextResponse.redirect(new URL('/unauthorised', req.url));

  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL('/help', req.url));
  }
}

// Apply middleware only on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
