import { Recipe } from '@/types';
import Link from 'next/link';

interface Props {
  recipe: Recipe;
}

export default function RecipeOverviewCard({ recipe }: Props) {
  return (
    <div className='flex flex-col rounded-md border border-gray-200 shadow-sm'>
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className='mb-2 h-32 w-full rounded-md object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-bold'>{recipe.name}</h3>
        <p className='line-clamp-2 text-sm text-gray-600'>
          {recipe.description}
        </p>
        <Link href={`/recipes/${recipe.id}`}>
          <span className='mt-4 block w-full rounded-full bg-lime-600 px-2 py-1 text-center text-sm text-white'>
            Bekijk
          </span>
        </Link>
      </div>
    </div>
  );
}
