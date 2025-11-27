// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs"; // Allowed here ✔️

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/checkout"];

  // check if URL matches protected segment
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Check expiry
    if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      return res;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT error:", error);

    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout"],
};
