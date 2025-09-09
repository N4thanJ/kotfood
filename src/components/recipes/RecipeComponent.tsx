import { Recipe, User } from '@/types';
import RecipeCard from './RecipeCard';
import Link from 'next/link';

interface Props {
  recipes: Recipe[];
  error: string;
  isLoading: boolean;
  user: Pick<User, 'id' | 'email' | 'username'> | null;
}

export default function RecipeComponent({
  recipes,
  error,
  isLoading,
  user,
}: Props) {
  return (
    <article className='rounded-xl bg-green-50 p-16'>
      <div className='mx-auto max-w-[1028px]'>
        <h2 className='mb-6 text-2xl font-extrabold text-green-800'>
          Hier zijn al enkele gerechten
        </h2>
        {isLoading ? (
          <p className='py-8 text-center text-gray-500'>Even geduld...</p>
        ) : error ? (
          <p className='py-8 text-center text-red-500'>{error}</p>
        ) : recipes.length === 0 ? (
          <p className='py-8 text-center text-gray-500'>
            Geen recepten gevonden.
          </p>
        ) : (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {recipes.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
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
      </div>
    </article>
  );
}
