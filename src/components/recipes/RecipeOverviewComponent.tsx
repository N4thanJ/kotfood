'use client';

import { type Recipe, type User, Category, Difficulty } from '@/types';
import { useState } from 'react';
import RecipeSidebar from './RecipeSidebar';
import RecipeOverviewCard from './RecipeOverviewCard';

interface Props {
  recipes: Recipe[];
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  isLoading: boolean;
  error: string | null;
}

export function getAllCategories(): Category[] {
  return Object.values(Category) as Category[];
}

export function getAllDifficulties(): Difficulty[] {
  return Object.values(Difficulty) as Difficulty[];
}

export default function RecipeOverviewComponent({
  recipes,
  user,
  isLoading,
  error,
}: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const difficulties = getAllDifficulties();
  const usedCategories = Array.from(
    new Set(recipes.map((recipe) => recipe.category)),
  ) as Category[];

  const filteredRecipes = recipes.filter((recipe) => {
    let matches = true;
    if (category && recipe.category !== category) matches = false;
    if (difficulty && recipe.difficulty !== difficulty) matches = false;
    return matches;
  });

  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  if (isLoading) {
    return (
      <section className='flex h-[calc(100vh-15px)] items-center justify-center px-8 pt-20'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600'></div>
          <p className='text-gray-600'>Recepten laden...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='flex h-[calc(100vh-15px)] items-center justify-center px-8 pt-20'>
        <div className='text-center'>
          <p className='text-red-600'>
            Fout bij het laden van recepten: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='flex h-[calc(100vh-15px)] gap-6 px-8 pt-20'>
      {/* Sidebar */}
      <RecipeSidebar
        usedCategories={usedCategories}
        difficulties={difficulties}
        category={category}
        difficulty={difficulty}
        setCategory={setCategory}
        setDifficulty={setDifficulty}
      />
      {/* Recipe list */}
      <article className='flex flex-1 flex-col'>
        <h2 className='mb-4 text-2xl font-extrabold'>Alle Recepten</h2>
        <div className='flex h-full min-h-0 flex-1 flex-col'>
          {/* Scrollable recipe grid */}
          <div className='min-h-0 flex-1 overflow-auto'>
            {paginatedRecipes.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {paginatedRecipes.map((recipe) => (
                  <RecipeOverviewCard
                    key={recipe.id}
                    recipe={recipe}
                    user={user}
                    adminPage={false}
                  />
                ))}
              </div>
            ) : (
              <div className='flex h-full items-center justify-center'>
                <p className='text-gray-500'>
                  Geen recepten gevonden met de huidige filters.
                </p>
              </div>
            )}
          </div>

          {/* Static pagination at bottom */}
          {filteredRecipes.length > PAGE_SIZE && (
            <div className='mt-4 flex flex-shrink-0 items-center justify-center gap-4 pt-4'>
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className='disabled:opacity-50:bg-gray-600 rounded-md bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300'
              >
                Vorige
              </button>
              <span className='text-sm font-medium text-gray-700'>
                Pagina {page} van{' '}
                {Math.ceil(filteredRecipes.length / PAGE_SIZE)}
              </span>
              <button
                disabled={page * PAGE_SIZE >= filteredRecipes.length}
                onClick={() => setPage((p) => p + 1)}
                className='disabled:opacity-50:bg-gray-600 rounded-md bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300'
              >
                Volgende
              </button>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
