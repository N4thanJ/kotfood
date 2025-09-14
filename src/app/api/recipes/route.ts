// app/api/recipes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

interface CustomJwtPayload extends jwt.JwtPayload {
  role: string;
}
export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as CustomJwtPayload;

    const { searchParams } = new URL(req.url);
    const inactiveFlag = searchParams.get('inactive');

    let recipes;

    if (decodedToken.role === 'Admin') {
      if (inactiveFlag) {
        recipes = await prisma.recipe.findMany({ where: { active: false } });
      } else {
        recipes = await prisma.recipe.findMany();
      }
    } else {
      if (inactiveFlag) {
        recipes = await prisma.recipe.findMany({ where: { active: false } });
      } else {
        recipes = await prisma.recipe.findMany({ where: { active: true } });
      }
    }

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
    const token = (await cookies()).get('token')?.value;

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

export async function PATCH(req: NextRequest) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as CustomJwtPayload;
    if (decodedToken.role !== 'Admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { recipeId, approve, comment } = body;

    if (!recipeId || typeof approve !== 'boolean') {
      return NextResponse.json(
        { message: 'Missing recipeId or approve flag' },
        { status: 400 },
      );
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        active: approve,
        reviewComment: comment || null,
      },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
