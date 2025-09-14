import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();

    const totalRecipes = recipes.length;
    const approvedRecipes = recipes.filter((r) => r.active).length;
    const pendingRecipes = recipes.filter((r) => !r.active).length;

    return NextResponse.json({
      total: totalRecipes,
      approved: approvedRecipes,
      pending: pendingRecipes,
    });
  } catch (error) {
    console.error('Failed to fetch recipe stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe stats' },
      { status: 500 },
    );
  }
}
