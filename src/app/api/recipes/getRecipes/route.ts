// app/api/recipes/getRecipes/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
