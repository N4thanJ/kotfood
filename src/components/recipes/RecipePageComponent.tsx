import { Recipe, User } from '@/types';
import RecipeHero from './RecipeHero';
import RecipeContent from './RecipeContent';
import RecipeCreator from './RecipeCreator';
import Reviewer from '../admin/Reviewer';
import RecipeContentEditor from './RecipeContentEditor';
import { mutate } from 'swr';

interface Props {
  recipe: Recipe;
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  adminPreviewer: boolean;
}

export default function RecipePageComponent({
  recipe,
  user,
  adminPreviewer,
}: Props) {
  const canEdit = user?.role === 'Admin' || user?.id === recipe.createdBy?.id;

  const onSave = (recipeId: string) => async (updatedContent: string) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to save recipe');
      mutate(`/api/recipes/${recipeId}`);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to save recipe');
    }
  };

  return (
    <section
      className={`mx-auto flex flex-col gap-8 px-4 pb-16 md:max-w-[1200px] md:px-6 ${
        !adminPreviewer ? 'pt-24' : 'pt-4'
      }`}
    >
      <div className='order-1 flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
        <div className='flex-1'>
          <RecipeHero recipe={recipe} />
        </div>

        {recipe.createdBy && (
          <aside className='hidden md:flex md:w-[320px] md:shrink-0 md:flex-col md:gap-6'>
            <RecipeCreator user={recipe.createdBy} />
            {user?.role === 'Admin' && <Reviewer recipe={recipe} />}
          </aside>
        )}
      </div>

      <div className='order-2 w-full'>
        {canEdit ? (
          recipe.id ? (
            <RecipeContentEditor
              initialContent={recipe.content}
              onSave={onSave(recipe.id)}
            />
          ) : (
            <div className='rounded-xl bg-red-50 p-4 font-bold text-red-600'>
              Error: Recipe ID is missing.
            </div>
          )
        ) : (
          <RecipeContent content={recipe.content} />
        )}
      </div>

      {recipe.createdBy && (
        <aside className='order-3 flex flex-col gap-6 md:hidden'>
          <div className='mb-4 h-px w-full bg-slate-100' />{' '}
          <RecipeCreator user={recipe.createdBy} />
          {user?.role === 'Admin' && <Reviewer recipe={recipe} />}
        </aside>
      )}
    </section>
  );
}
