'use client';

import { useState } from 'react';
import RecipeOverviewCard from '@/components/recipes/RecipeOverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import type { Recipe } from '@/types';
import Link from 'next/link';
import useSWR from 'swr';
import ControlsOverview from '@/components/layout/ControlsOverview';

export default function Recipes() {
  const { user } = useAuth();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: recipes = [], error } = useSWR<Recipe[]>(
    '/api/recipes',
    fetcher,
  );

  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);

  const paginatedRecipes = recipes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const totalPages = Math.ceil(recipes.length / PAGE_SIZE);

  if (error) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center gap-4 text-red-600'>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col'>
      {/* Header with Add button */}
      <div className='mb-4 flex items-center gap-4'>
        <h1 className='text-3xl font-black'>Alle recepten</h1>
        <Link
          href='/new'
          className='rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700'
        >
          Nieuw recept
        </Link>
      </div>

      <div className='flex-1'>
        {/* Recipes grid */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {paginatedRecipes.length === 0 ? (
            <div className='col-span-full text-gray-500'>
              Geen recepten gevonden
            </div>
          ) : (
            paginatedRecipes.map((recipe) => (
              <RecipeOverviewCard
                key={recipe.id}
                recipe={recipe}
                user={user}
                adminPage={true}
              />
            ))
          )}
        </div>
      </div>

      <ControlsOverview
        recipes={recipes}
        PAGE_SIZE={PAGE_SIZE}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
