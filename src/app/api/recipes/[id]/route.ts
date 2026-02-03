import { scanRecipeWithAI } from '@/lib/aiScanner';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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

export async function DELETE(request: NextRequest) {
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
    });

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 },
      );
    }

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Recipe deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting recipe: ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'ID is undefined' }, { status: 400 });
    }

    const { content } = await request.json();

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: { content },
    });
    if (content && content.replace(/<[^>]*>/g, '').length > 20) {
      (async () => {
        try {
          const fullRecipe = await prisma.recipe.findUnique({
            where: { id },
            select: { name: true, description: true },
          });

          if (fullRecipe) {
            const aiReview = await scanRecipeWithAI(
              fullRecipe.name,
              fullRecipe.description,
              content,
            );

            const aiData = JSON.parse(aiReview);

            const shouldAutoApprove =
              !aiData.isSuspicious && aiData.safetyScore > 80;

            await prisma.recipe.update({
              where: { id },
              data: {
                aiReview: aiReview,
                active: shouldAutoApprove ? true : false,
              },
            });
            console.log(`✅ AI Moderatie voltooid voor recept: ${id}`);
            if (shouldAutoApprove) {
              console.log(`🚀 Recept ${id} automatisch goedgekeurd door AI.`);
            }
          }
        } catch (aiError) {
          console.error('❌ AI Background task failed:', aiError);
        }
      })();
    }

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error('Error in PATCH recipe:', error);
    return NextResponse.json(
      { message: 'Failed to update content' },
      { status: 500 },
    );
  }
}
