import { useState } from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className='card bg-base-100 bg-background flex w-80 flex-col overflow-hidden rounded-md shadow-sm'>
      <figure className='relative'>
        <img
          src={
            recipe.imageUrl ||
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
          }
          alt={`Image of ${recipe.name}`}
          className={`h-48 w-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-300'>
            <span className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500' />
          </div>
        )}
      </figure>

      <div className='card-body flex flex-1 flex-col p-4'>
        <h2 className='card-title font-bold'>{recipe.name}</h2>
        <p className='mb-4'>{recipe.description}</p>
        <div className='card-actions mt-auto'>
          <Link href={`/recipes/${recipe.id}`}>
            <span className='btn block w-full rounded-full bg-lime-600 px-3 py-2 text-center text-white'>
              Check dit recept
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
