import { Category, Difficulty } from '@/types';
import { Filter, Check, RotateCcw, Search } from 'lucide-react';

interface Props {
  usedCategories: Category[];
  difficulties: Difficulty[];
  category: Category | null;
  difficulty: Difficulty | null;
  setCategory: (category: Category | null) => void;
  setDifficulty: (difficulty: Difficulty | null) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function RecipeSidebar({
  usedCategories,
  difficulties,
  category,
  difficulty,
  setCategory,
  setDifficulty,
  setIsSidebarOpen,
}: Props) {
  return (
    <aside className='flex h-full min-h-0 flex-col md:h-auto md:w-64 md:shrink-0 md:rounded-xl md:border md:border-gray-200 md:bg-white md:p-6 md:shadow-sm'>
      {/* Scrollable Filter Area */}
      <div className='min-h-0 flex-1 overflow-y-auto pr-2 pb-32 md:overflow-visible md:pb-0'>
        <h3 className='hidden items-center gap-2 text-xl font-black text-green-700 md:mb-6 md:flex'>
          <Filter className='h-5 w-5' /> Filters
        </h3>

        {/* Categories */}
        <section className='mb-8'>
          <h4 className='mb-4 text-xs font-black tracking-widest text-slate-400 uppercase'>
            Categorie
          </h4>
          <ul className='flex flex-wrap gap-2 md:flex-col md:space-y-1'>
            {usedCategories.map((cat) => {
              const isActive = category === cat;
              return (
                <li key={cat} className='w-full'>
                  <button
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all md:rounded-lg md:py-2 md:text-sm ${
                      isActive
                        ? 'bg-green-600 font-bold text-white shadow-md shadow-green-200 md:bg-green-100 md:text-green-700 md:shadow-none'
                        : 'bg-slate-50 text-slate-700 active:bg-slate-200 md:bg-transparent md:hover:bg-slate-100'
                    }`}
                    onClick={() => setCategory(isActive ? null : cat)}
                  >
                    <span>{cat}</span>
                    {isActive && <Check size={18} className='md:hidden' />}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Difficulty */}
        <section className='mb-8'>
          <h4 className='mb-4 text-xs font-black tracking-widest text-slate-400 uppercase'>
            Moeilijkheid
          </h4>
          <div className='grid grid-cols-1 gap-2'>
            {difficulties.map((level) => {
              const isActive = difficulty === level;
              return (
                <button
                  key={level}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all md:rounded-lg md:py-2 md:text-sm ${
                    isActive
                      ? 'bg-green-600 font-bold text-white shadow-md shadow-green-200 md:bg-green-100 md:text-green-700 md:shadow-none'
                      : 'bg-slate-50 text-slate-700 active:bg-slate-200 md:bg-transparent md:hover:bg-slate-100'
                  }`}
                  onClick={() => setDifficulty(isActive ? null : level)}
                >
                  <span>{level}</span>
                  {isActive && <Check size={18} className='md:hidden' />}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Floating Action Buttons Area */}
      <div className='sticky right-0 bottom-0 left-0 z-10 -mx-6 mt-auto bg-gradient-to-t from-white via-white/95 to-transparent px-6 pt-10 pb-8 md:relative md:bottom-auto md:mx-0 md:bg-none md:p-0 md:pt-4'>
        <div className='relative flex flex-col gap-3'>
          <button
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 transition-colors md:rounded-lg md:py-2'
            onClick={() => {
              setCategory(null);
              setDifficulty(null);
            }}
          >
            <RotateCcw size={16} /> Reset filters
          </button>

          <button
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-base font-black text-white shadow-xl shadow-green-200 transition-all active:scale-95 md:hidden'
            onClick={() => setIsSidebarOpen(false)}
          >
            <Search size={18} />
            Vind recepten
          </button>
        </div>
      </div>
    </aside>
  );
}
