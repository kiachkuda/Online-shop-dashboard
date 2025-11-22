import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  // Clear the token by setting it with an expired date
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.headers.set(
    'set-cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Expire immediately
      path: '/',
    })
  );

  return response;
}
