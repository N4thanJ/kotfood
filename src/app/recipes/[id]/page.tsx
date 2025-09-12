'use client';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import RecipePageComponent from '@/components/recipes/RecipePageComponent';
import { useAuth } from '@/contexts/AuthContext';
import RecipeService from '@/service/RecipeService';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function Recipe() {
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
        <Navigation user={user} darkerText />
        <div>Recipe not found.</div>
      </main>
    );
  }

  return (
    <main>
      <Navigation user={user} darkerText />
      {data && <RecipePageComponent recipe={data} />}
      <Footer user={user} />
    </main>
  );
}
