import { Recipe } from '@/types';
import RecipeCard from './RecipeCard';

interface Props {
  recipes: Recipe[];
  error: String;
  isLoading: boolean;
}

export default function RecipeComponent({ recipes, error, isLoading }: Props) {
  return (
    <section className='rounded-xl bg-green-50 p-16'>
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
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
