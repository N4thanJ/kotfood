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
    return;
  }

  if (error) {
    return (
      <main>
        <div>Recipe not found.</div>
      </main>
    );
  }

  return (
    <main>{data && <RecipePageComponent recipe={data} user={user} />}</main>
  );
}
