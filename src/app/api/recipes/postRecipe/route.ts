// app/api/recipes/postRecipe/route.ts

import { prisma } from '@/lib/prisma';
import { Recipe } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json(
      { message: 'Invalid request payload' },
      { status: 400 },
    );
  }

  const { name, description }: Recipe = body;

  if (!name || !description) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 },
    );
  }

  try {
    const response = await prisma.recipe.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe: ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
