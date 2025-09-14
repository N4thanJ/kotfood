// app/api/auth/ping/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const cookies = req.headers.get('cookie') || '';
  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.token;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return NextResponse.json({ user: null }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
