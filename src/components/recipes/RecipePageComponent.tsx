import { Recipe, User } from '@/types';
import RecipeHero from './RecipeHero';
import RecipeContent from './RecipeContent';
import RecipeCreator from './RecipeCreator';
import Reviewer from '../admin/Reviewer';

interface Props {
  recipe: Recipe;
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export default function RecipePageComponent({ recipe, user }: Props) {
  return (
    <section
      className={`mx-auto flex max-w-[1200px] gap-8 px-6 ${user?.role !== 'Admin' && 'pt-24'}`}
    >
      <div className='flex-1'>
        <RecipeHero recipe={recipe} />
        <RecipeContent />
      </div>
      {recipe.createdBy && (
        <div className='flex-[0.3]'>
          <RecipeCreator user={recipe.createdBy} />
          {user?.role === 'Admin' && <Reviewer recipe={recipe} />}
        </div>
      )}
    </section>
  );
}
