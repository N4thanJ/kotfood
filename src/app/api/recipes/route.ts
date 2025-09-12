// app/api/recipes/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error('Error getting recipes: ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check token from cookie
    const cookies = req.headers.get('cookie') || '';
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }

    // Decode JWT
    let userId: string;
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
      userId = decoded.id;
    } catch (err) {
      console.error('JWT verification failed:', err);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const { name, description, imageUrl, category, difficulty } = body;

    if (!name || !description || !imageUrl) {
      return NextResponse.json(
        { message: 'All fields are required (name, description, imageUrl)' },
        { status: 400 },
      );
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        category: category || 'Dessert',
        difficulty: difficulty || 'Makkelijk',
        userId,
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
