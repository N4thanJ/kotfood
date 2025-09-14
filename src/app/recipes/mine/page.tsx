'use client';

import Navigation from '@/components/layout/Navigation';
import RecipeOverviewComponent from '@/components/recipes/RecipeOverviewComponent';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types';
import useSWR from 'swr';

export default function Mine() {
  const { user } = useAuth();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<Recipe[]>('/api/recipes?mine=true', fetcher);

  if (isLoading) {
    return (
      <section className='flex h-[calc(100vh-15px)] items-center justify-center px-8 pt-20'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600'></div>
          <p className='text-gray-600'>Recepten worden laden...</p>
        </div>
      </section>
    );
  }

  return (
    <main>
      <Navigation user={user} darkerText={true} />

      <RecipeOverviewComponent
        recipes={data || []}
        user={user}
        isLoading={isLoading}
        error={error}
        personal={true}
      />
    </main>
  );
}
