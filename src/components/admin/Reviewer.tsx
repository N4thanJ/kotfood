'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Recipe } from '@/types';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, Shield } from 'lucide-react';

interface ReviewerProps {
  recipe: Recipe;
}

export default function Reviewer({ recipe }: ReviewerProps) {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const aiData = recipe.aiReview ? JSON.parse(recipe.aiReview) : null;

  const handleEnable = async () => {
    if (!confirm('Are you sure you want to enable this recipe?')) return;

    try {
      const res = await fetch(`/api/recipes`, {
        method: 'PATCH',
        body: JSON.stringify({
          recipeId: recipe.id,
          active: true,
          comment: comment,
        }),
      });

      if (!res.ok) throw new Error('Failed to enable');

      mutate('/api/recipes');
      setIsOpen(false);
      router.push('/admin/recipes');
    } catch (err) {
      console.error(err);
      alert('Failed to enable recipe');
    }
  };

  const handleDisable = async () => {
    if (!confirm('Are you sure you want to disable this recipe?')) return;

    try {
      const res = await fetch(`/api/recipes`, {
        method: 'PATCH',
        body: JSON.stringify({
          recipeId: recipe.id,
          active: false,
          comment: comment,
        }),
      });

      if (!res.ok) throw new Error('Failed to disable');

      mutate('/api/recipes');
      setIsOpen(false);
      setComment('');
      router.push('/admin/recipes/inactive');
    } catch (err) {
      console.error(err);
      alert('Failed to disable recipe');
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className='fixed right-6 bottom-6 z-50'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className='relative'>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='panel'
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className='absolute right-0 bottom-0 w-80 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl'
            >
              <h3 className='mb-2 flex items-center gap-2 text-lg font-bold text-gray-800'>
                <Shield size={18} className='text-blue-600' />
                Review Recipe
              </h3>

              <p className='mb-4 text-xs text-gray-500'>
                Reviewing:{' '}
                <span className='font-medium text-gray-700'>{recipe.name}</span>
              </p>

              {aiData ? (
                <div
                  className={`mb-4 rounded-xl border p-3 ${aiData.isSuspicious ? 'border-red-100 bg-red-50' : 'border-green-100 bg-green-50'}`}
                >
                  <div className='mb-1 flex items-center justify-between'>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${aiData.isSuspicious ? 'text-red-600' : 'text-green-600'}`}
                    >
                      AI Scan Resultaat
                    </span>
                    <span className='rounded border bg-white px-1.5 py-0.5 font-mono text-[10px]'>
                      Score: {aiData.safetyScore}
                    </span>
                  </div>

                  <div className='flex items-start gap-2'>
                    {aiData.isSuspicious ? (
                      <AlertCircle
                        size={14}
                        className='mt-0.5 shrink-0 text-red-500'
                      />
                    ) : (
                      <CheckCircle
                        size={14}
                        className='mt-0.5 shrink-0 text-green-500'
                      />
                    )}
                    <p className='text-xs leading-snug text-gray-700'>
                      {aiData.reason || 'Geen bijzonderheden gevonden.'}
                    </p>
                  </div>

                  {aiData.redFlags?.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-1'>
                      {aiData.redFlags.map((flag: string, i: number) => (
                        <span
                          key={i}
                          className='rounded bg-red-200/50 px-1.5 py-0.5 text-[9px] font-medium text-red-700'
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className='mb-4 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3'>
                  <div className='h-2 w-2 animate-pulse rounded-full bg-gray-300' />
                  <p className='text-[10px] text-gray-500 italic'>
                    AI analyse in afwachting van content...
                  </p>
                </div>
              )}
              {/* --- EINDE AI SECTIE --- */}

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Opmerkingen voor de student...'
                className='mb-4 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                rows={3}
              />

              <div className='flex gap-3'>
                <button
                  onClick={handleEnable}
                  className='flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95'
                >
                  Enable
                </button>
                <button
                  onClick={handleDisable}
                  className='flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95'
                >
                  Disable
                </button>
              </div>
            </motion.div>
          )}

          {!isOpen && (
            <motion.button
              key='button'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsOpen(true)}
              className='rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:bg-slate-800'
            >
              Review Recept
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
