'use client';

import RecipeOverviewCard from '@/components/recipes/RecipeOverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types';
import Link from 'next/link';
import useSWR from 'swr';

export default function Innactive() {
  const { user } = useAuth();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: recipes = [], error } = useSWR<Recipe[]>(
    '/api/recipes?inactive=true',
    fetcher,
  );

  if (error) {
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>Error: + {error}</div>
    </div>;
  }

  return (
    <div className='space-y-4'>
      {/* Header with Add button */}
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>Alle Recepten</h1>
        <Link
          href='/new'
          className='rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700'
        >
          Nieuw recept
        </Link>
      </div>

      {/* Recipes grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {recipes.length === 0 ? (
          <div>No recipes found</div>
        ) : (
          recipes.map((recipe) => (
            <RecipeOverviewCard key={recipe.id} recipe={recipe} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
