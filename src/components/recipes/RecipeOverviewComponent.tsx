'use client';

import { type Recipe, type User, Category, Difficulty } from '@/types';
import { useState } from 'react';
import RecipeSidebar from './RecipeSidebar';
import RecipeOverviewCard from './RecipeOverviewCard';
import { Filter, X } from 'lucide-react';

interface Props {
  recipes: Recipe[];
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  isLoading: boolean;
  error: string | null;
  personal: boolean;
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
  personal,
}: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <p className='text-gray-600'>Recepten worden geladen...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='relative flex h-[calc(100vh-15px)] flex-col gap-6 px-4 pt-24 md:flex-row md:px-8'>
      {/* Floating Mobile Filter Button */}
      <div className='fixed right-6 bottom-8 z-50 md:hidden'>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className='flex items-center gap-2 rounded-full bg-green-600 px-3 py-2 font-bold text-white shadow-2xl transition-transform hover:scale-105 active:scale-95'
        >
          <Filter size={20} />
          <span>Filters</span>
          {(category || difficulty) && (
            <span className='ml-1 flex items-center justify-center rounded-full bg-white text-[10px] font-bold text-green-600'>
              !
            </span>
          )}
        </button>
      </div>

      {/* Sliding Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-[60] transform transition-all duration-300 md:relative md:inset-auto md:z-0 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
      >
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div className='relative flex h-[100dvh] w-full flex-col bg-white p-6 md:h-auto md:w-auto md:bg-transparent md:p-0'>
          <div className='mb-6 flex shrink-0 items-center justify-between md:hidden'>
            <h3 className='text-2xl font-black text-slate-900'>Filters</h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className='rounded-full bg-slate-100 p-2 text-slate-900'
            >
              <X size={24} />
            </button>
          </div>

          <RecipeSidebar
            usedCategories={usedCategories}
            difficulties={difficulties}
            category={category}
            difficulty={difficulty}
            setCategory={setCategory}
            setDifficulty={setDifficulty}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      {/* Recipe list */}
      <article className='flex min-w-0 flex-1 flex-col'>
        <h2 className='mb-4 text-2xl font-extrabold text-slate-900'>
          {!personal ? 'Alle Recepten' : 'Mijn recepten'}
        </h2>

        <div className='flex h-full min-h-0 flex-1 flex-col'>
          <div className='min-h-0 flex-1 md:pb-24'>
            {paginatedRecipes.length > 0 ? (
              <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
              <div className='flex h-[50vh] flex-col items-center justify-center gap-4 text-center'>
                <p className='text-gray-500'>Geen recepten gevonden.</p>
                <button
                  onClick={() => {
                    setCategory(null);
                    setDifficulty(null);
                  }}
                  className='font-bold text-green-600 underline'
                >
                  Filters resetten
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredRecipes.length > PAGE_SIZE && (
            <div className='mb-4 flex flex-shrink-0 items-center justify-center gap-4 bg-white py-4 md:mb-0'>
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage((p) => p - 1);
                  window.scrollTo(0, 0);
                }}
                className='rounded-md bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200 disabled:opacity-30'
              >
                Vorige
              </button>
              <span className='text-sm font-medium'>
                {page} / {Math.ceil(filteredRecipes.length / PAGE_SIZE)}
              </span>
              <button
                disabled={page * PAGE_SIZE >= filteredRecipes.length}
                onClick={() => {
                  setPage((p) => p + 1);
                  window.scrollTo(0, 0);
                }}
                className='rounded-md bg-slate-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-slate-200 disabled:opacity-30'
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
