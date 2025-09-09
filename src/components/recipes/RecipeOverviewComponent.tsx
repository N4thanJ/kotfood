import { Recipe, User, Category, Difficulty } from '@/types';
import { useState } from 'react';
import RecipeSidebar from './RecipeSidebar';
import RecipeOverviewCard from './RecipeOverviewCard';
import Link from 'next/link';

interface Props {
  recipes: Recipe[];
  user: Pick<User, 'id' | 'email' | 'username'> | null;
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

  return (
    <section className='flex gap-6 p-8'>
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
      <article className='flex-1 rounded-xl bg-green-50 p-8 shadow-sm'>
        <h2 className='mb-6 text-2xl font-extrabold text-green-800'>
          Alle recepten
        </h2>

        {isLoading ? (
          <p className='py-8 text-center text-gray-500'>Even geduld...</p>
        ) : error ? (
          <p className='py-8 text-center text-red-500'>{error}</p>
        ) : filteredRecipes.length === 0 ? (
          <p className='py-8 text-center text-gray-500'>
            Geen recepten gevonden.
          </p>
        ) : (
          <div className='grid grid-cols-4 gap-4'>
            {filteredRecipes.slice(0, 8).map((recipe) => (
              <RecipeOverviewCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {user ? (
          <p className='mt-4 text-center'>
            Wil je graag zelf eentje publiceren?{' '}
            <Link href='/recipes' className='text-green-700 underline'>
              Klik dan hier!
            </Link>
          </p>
        ) : (
          <p className='mt-4 text-center'>
            <Link href='/login' className='text-green-700 underline'>
              Log in
            </Link>{' '}
            om zelf een recept te publiceren.
          </p>
        )}
      </article>
    </section>
  );
}
