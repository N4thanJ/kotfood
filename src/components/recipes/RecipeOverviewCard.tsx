import type { Recipe, User } from '@/types';
import { Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { mutate } from 'swr';

interface Props {
  recipe: Recipe;
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
  adminPage: boolean;
}

export default function RecipeOverviewCard({ recipe, user, adminPage }: Props) {
  const isAdmin = user?.role === 'Admin';
  const href =
    isAdmin && adminPage
      ? `/admin/recipes/${recipe.id}`
      : `/recipes/${recipe.id}`;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      mutate('/api/recipes');
    } catch (err) {
      console.error(err);
      alert('Failed to delete recipe');
    }
  };

  return (
    <div className='group relative block h-full w-full'>
      {/* Card link */}
      <Link href={href} className='block h-full w-full'>
        <div className='relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg'>
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
            <h3 className='text-base font-bold text-gray-900'>{recipe.name}</h3>
            <p className='line-clamp-2 flex-1 text-xs text-gray-600'>
              {recipe.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Admin delete button */}
      {isAdmin && (
        <button
          type='button'
          onClick={() => handleDelete()}
          className='absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}
