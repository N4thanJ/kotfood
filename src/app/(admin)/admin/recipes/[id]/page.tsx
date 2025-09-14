'use client';

import RecipePageComponent from '@/components/recipes/RecipePageComponent';
import { useAuth } from '@/contexts/AuthContext';
import RecipeService from '@/service/RecipeService';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function RecipeReview() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const fetcher = async (url: string, recipeId: string) => {
    const response = await RecipeService.getRecipeByID(recipeId);
    return response;
  };

  // Use a unique cache key that includes the recipe ID
  const { data, isLoading, error } = useSWR(
    id ? [`/api/recipes/${id}`, id] : null,
    ([url, recipeId]) => fetcher(url, recipeId),
  );

  if (isLoading) {
    return (
      <section className='flex h-[calc(100vh-15px)] items-center justify-center px-8 pt-20'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600'></div>
          <p className='text-gray-600'>Recept wordt geladen...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <main>
        <div>Recipe not found.</div>
      </main>
    );
  }

  return (
    <main>
      {data && <RecipePageComponent recipe={data} user={user} adminPreviewer />}
    </main>
  );
}
