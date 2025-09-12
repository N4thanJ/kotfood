import type { Recipe } from '@/types';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface Props {
  recipe: Recipe;
}

export default function RecipeOverviewCard({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`} className='group block h-full w-full'>
      <div className='relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'>
        <div className='relative h-28 w-full overflow-hidden'>
          <img
            src={recipe.imageUrl || '/placeholder.svg'}
            alt={recipe.name}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          {/* Overlay with icon on hover */}
          <div className='absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10'>
            <Search className='h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          </div>
        </div>
        <div className='flex flex-1 flex-col p-3'>
          <h3 className='text-base font-bold text-gray-900 dark:text-gray-100'>
            {recipe.name}
          </h3>
          <p className='line-clamp-2 flex-1 text-xs text-gray-600 dark:text-gray-300'>
            {recipe.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
