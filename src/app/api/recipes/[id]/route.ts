import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'Recipe ID is required' },
        { status: 400 },
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error('Error getting recipe: ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
