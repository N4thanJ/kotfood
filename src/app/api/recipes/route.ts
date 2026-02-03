// app/api/recipes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { scanRecipeWithAI } from '@/lib/aiScanner';

interface CustomJwtPayload extends jwt.JwtPayload {
  role: string;
}

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get('token')?.value;
    const { searchParams } = new URL(req.url);

    const personalFlag = searchParams.get('mine');
    const inactiveFlag = searchParams.get('inactive');

    // 🔓 Niet ingelogd → enkel actieve recepten
    if (!token) {
      const recipes = await prisma.recipe.findMany({
        where: { active: true },
      });
      return NextResponse.json(recipes, { status: 200 });
    }

    // 🔑 Ingelogd → decode token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as CustomJwtPayload;

    let recipes;

    if (personalFlag) {
      // Mijn recepten
      recipes = await prisma.recipe.findMany({
        where: { userId: decodedToken.id },
      });
    } else if (decodedToken.role === 'Admin') {
      // alle recepten
      recipes = await prisma.recipe.findMany();
    } else {
      // enkel actieve recepten
      recipes = await prisma.recipe.findMany({
        where: { active: true },
      });
    }

    if (inactiveFlag) {
      if (decodedToken.role === 'Admin') {
        recipes = await prisma.recipe.findMany({
          where: { active: false },
        });
      } else {
        return NextResponse.json(
          'You are not authorized to access this resource',
          { status: 403 },
        );
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
    const { recipeId, active, comment } = body;

    if (!recipeId || typeof active !== 'boolean') {
      return NextResponse.json(
        { message: 'Missing recipeId or active flag' },
        { status: 400 },
      );
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        active,
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
