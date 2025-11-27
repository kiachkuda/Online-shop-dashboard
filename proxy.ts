// middleware.ts
export const runtime = "nodejs";  // ✅ Force Node.js runtime
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


// const roleAccess: Record<string, string[]> = {
//   admin: ['/dashboard'],
//   user: ['/shop'],
// };



export function proxy(req: NextRequest) {
    const token = req.cookies.get('token')!.value;

   if(!token) return NextResponse.redirect(new URL('/login', req.url));

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if(typeof decoded === 'object' && decoded.exp && Date.now() >= decoded.exp * 1000){
        req.cookies.delete('token');
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next(); 

  }catch(error){
    console.error(error);
  }

}

// Apply Proxy only on dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', '/checkout'],
};
