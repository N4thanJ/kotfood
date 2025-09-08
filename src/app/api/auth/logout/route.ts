import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // immediately expires
  });

  return response;
}
