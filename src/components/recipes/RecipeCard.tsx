import { Recipe } from '@/types';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <article className='card bg-base-100 w-80 overflow-hidden rounded-md shadow-sm'>
      <figure>
        <img
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          alt='Shoes'
        />
      </figure>
      <div className='card-body p-4'>
        <h2 className='card-title'>{recipe.name}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </article>
  );
}
