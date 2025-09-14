'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Recipe } from '@/types';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';

interface ReviewerProps {
  recipe: Recipe;
}

export default function Reviewer({ recipe }: ReviewerProps) {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative'>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='panel'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15 }}
              className='absolute right-0 bottom-0 w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-xl'
            >
              <h3 className='mb-4 text-lg font-semibold text-gray-800'>
                Review Recipe
              </h3>
              <p className='mb-4 text-sm text-gray-600'>
                Reviewing: <span className='font-medium'>{recipe.name}</span>
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Add comments (optional)...'
                className='mb-4 w-full resize-none rounded-lg border border-gray-300 p-2 text-sm focus:border-gray-500 focus:outline-none'
                rows={3}
              />
              <div className='flex gap-3'>
                <button
                  onClick={handleEnable}
                  className='flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700'
                >
                  Enable
                </button>
                <button
                  onClick={handleDisable}
                  className='flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700'
                >
                  Disable
                </button>
              </div>
            </motion.div>
          )}

          {!isOpen && (
            <motion.button
              key='button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleButtonClick}
              className='rounded-full bg-green-600 px-5 py-3 text-white shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl'
            >
              Review
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
