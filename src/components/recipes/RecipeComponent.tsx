import { Recipe, User } from '@/types';
import RecipeNavigator from './RecipeNavigator';
import RecipeOverviewCard from './RecipeOverviewCard';

interface Props {
  recipes: Recipe[];
  error: string;
  isLoading: boolean;
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export default function RecipeComponent({
  recipes,
  error,
  isLoading,
  user,
}: Props) {
  return (
    <article className='bg-background rounded-xl p-16'>
      <div className='mx-auto max-w-[1028px]'>
        <h2 className='mb-4 text-3xl font-bold'>Bekijk Onze favorieten ❤️</h2>
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
              <RecipeOverviewCard
                key={recipe.id}
                recipe={recipe}
                user={user}
                adminPage={false}
              />
            ))}
          </div>
        )}

        <RecipeNavigator user={user} />
      </div>
    </article>
  );
}
