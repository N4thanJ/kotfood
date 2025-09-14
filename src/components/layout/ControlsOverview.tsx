import { Recipe } from '@/types';
import { SetStateAction } from 'react';

interface Props {
  recipes: Recipe[];
  PAGE_SIZE: number;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
  totalPages: number;
}

export default function ControlsOverview({
  recipes,
  PAGE_SIZE,
  page,
  setPage,
  totalPages,
}: Props) {
  return (
    <div className='mt-auto flex items-center justify-center gap-4 pt-4'>
      {recipes.length > PAGE_SIZE ? (
        <>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className='bg-buttons disabled:opacity-50:bg-gray-600 rounded-md px-3 py-1 text-sm hover:bg-gray-300'
          >
            Vorige
          </button>
          <span className='text-sm font-medium text-gray-700'>
            Pagina {page} van {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className='bg-buttons disabled:opacity-50:bg-gray-600 rounded-md px-3 py-1 text-sm hover:bg-gray-300'
          >
            Volgende
          </button>
        </>
      ) : (
        <div className='h-8'></div>
      )}
    </div>
  );
}
