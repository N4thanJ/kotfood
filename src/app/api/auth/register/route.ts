// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // Basic validation
    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // Return success (omit password in response)
    const { password: _, ...userSafe } = user;
    return NextResponse.json({ success: true, user: userSafe });
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
