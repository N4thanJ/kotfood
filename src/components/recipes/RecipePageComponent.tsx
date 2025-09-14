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
      alert('Recipe updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to save recipe');
    }
  };

  return (
    <section
      className={`mx-auto flex max-w-[1200px] gap-8 px-6 ${!adminPreviewer && 'pt-24'}`}
    >
      <div className='flex-1'>
        <RecipeHero recipe={recipe} />
        {canEdit ? (
          recipe.id ? (
            <RecipeContentEditor
              initialContent={recipe.content}
              onSave={onSave(recipe.id)}
            />
          ) : (
            <div>Error: Recipe ID is missing.</div>
          )
        ) : (
          <RecipeContent content={recipe.content} />
        )}
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
