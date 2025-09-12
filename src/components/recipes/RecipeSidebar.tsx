import { Category, Difficulty } from '@/types';
import { Filter } from 'lucide-react';

interface Props {
  usedCategories: Category[];
  difficulties: Difficulty[];
  category: Category | null;
  difficulty: Difficulty | null;
  setCategory: (category: Category | null) => void;
  setDifficulty: (difficulty: Difficulty | null) => void;
}

export default function RecipeSidebar({
  usedCategories,
  difficulties,
  category,
  difficulty,
  setCategory,
  setDifficulty,
}: Props) {
  return (
    <aside className='w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-green-800 dark:text-green-400'>
        <Filter className='h-5 w-5' /> Filters
      </h3>

      {/* Categories */}
      <div className='mb-6'>
        <h4 className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
          Categorie
        </h4>
        <ul className='space-y-1'>
          {usedCategories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full rounded-md px-2 py-1 text-left text-sm ${
                  category === cat
                    ? 'bg-green-100 font-medium text-green-700 dark:bg-green-700 dark:text-green-100'
                    : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setCategory(category === cat ? null : cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Difficulty */}
      <div className='mb-6'>
        <h4 className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
          Moeilijkheid
        </h4>
        <ul className='space-y-1'>
          {difficulties.map((level) => (
            <li key={level}>
              <button
                className={`w-full rounded-md px-2 py-1 text-left text-sm ${
                  difficulty === level
                    ? 'bg-green-100 font-medium text-green-700 dark:bg-green-700 dark:text-green-100'
                    : 'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() =>
                  setDifficulty(difficulty === level ? null : level)
                }
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className='w-full rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        onClick={() => {
          setCategory(null);
          setDifficulty(null);
        }}
      >
        Reset filters
      </button>
    </aside>
  );
}
