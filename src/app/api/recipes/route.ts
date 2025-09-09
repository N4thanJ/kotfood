// app/api/recipes/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json(
      { message: 'Invalid request payload' },
      { status: 400 },
    );
  }

  const { name, description, imageUrl } = body;

  if (!name || !description || !imageUrl) {
    return NextResponse.json(
      { message: 'All fields are required (name, description, imageUrl)' },
      { status: 400 },
    );
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe: ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
