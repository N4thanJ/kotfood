'use client';

import ControlsOverview from '@/components/layout/ControlsOverview';
import RecipeOverviewCard from '@/components/recipes/RecipeOverviewCard';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types';
import { useState } from 'react';
import useSWR from 'swr';

export default function Innactive() {
  const { user } = useAuth();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: recipes = [], error } = useSWR<Recipe[]>(
    '/api/recipes?inactive=true',
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
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>Error: + {error}</div>
    </div>;
  }

  return (
    <div className='space-y-4'>
      {/* Header with Add button */}
      <div className='flex items-center gap-4'>
        <h1 className='text-3xl font-black'>Alle Inactieve Recepten</h1>
      </div>

      {/* Recipes grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {paginatedRecipes.length === 0 ? (
          <div>Geen inactieve recepten gevonden</div>
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
