'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Recipe, User } from '@/types';
import { mutate } from 'swr';

interface ReviewerProps {
  recipe: Recipe;
  admin: Pick<User, 'id' | 'email' | 'username' | 'role'>;
}

export default function Reviewer({ recipe, admin }: ReviewerProps) {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this recipe?')) return;

    try {
      const res = await fetch(`/api/recipes`, {
        method: 'PATCH',
        body: JSON.stringify({
          recipeId: recipe.id,
          approve: true,
          comment: comment,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');

      mutate('/api/recipes');
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to reject recipe');
    }
  };

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this recipe?')) return;

    try {
      const res = await fetch(`/api/recipes`, {
        method: 'PATCH',
        body: JSON.stringify({
          recipeId: recipe.id,
          approve: false,
          comment: comment,
        }),
      });

      if (!res.ok) throw new Error('Failed to update');

      mutate('/api/recipes');
      setIsOpen(false);
      setComment('');
    } catch (err) {
      console.error(err);
      alert('Failed to reject recipe');
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
                  onClick={handleApprove}
                  className='flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700'
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className='flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700'
                >
                  Reject
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
