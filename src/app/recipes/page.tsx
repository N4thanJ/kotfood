'use client';
import Navigation from '@/components/layout/Navigation';
import RecipeOverviewComponent from '@/components/recipes/RecipeOverviewComponent';
import { useAuth } from '@/contexts/AuthContext';
import RecipeService from '@/service/RecipeService';
import useSWR from 'swr';

export default function Recipes() {
  const { user } = useAuth();

  const fetcher = async () => {
    const response = await RecipeService.getRecipes();
    return response;
  };

  const { data, error, isLoading } = useSWR('/api/recipes', fetcher);

  return (
    <main>
      <Navigation user={user} darkerText={true} />
      <RecipeOverviewComponent
        recipes={data || []}
        user={user}
        isLoading={isLoading}
        error={error}
        personal={false}
      />
    </main>
  );
}
