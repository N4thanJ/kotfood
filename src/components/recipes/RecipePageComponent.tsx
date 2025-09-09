import { Recipe } from '@/types';
import RecipeHero from './RecipeHero';
import RecipeContent from './RecipeContent';
import RecipeCreator from './RecipeCreator';

interface Props {
  recipe: Recipe;
}

export default function RecipePageComponent({ recipe }: Props) {
  console.log(recipe);

  return (
    <section className='mx-auto flex max-w-[1200px] gap-8 px-6 pt-24'>
      <div className='flex-1'>
        <RecipeHero recipe={recipe} />
        <RecipeContent content={<>Hello world!</>} />
      </div>
      {recipe.createdBy && (
        <div className='flex-[0.4]'>
          <RecipeCreator user={recipe.createdBy} />
        </div>
      )}
    </section>
  );
}
