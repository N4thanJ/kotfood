'use client';

import RecipeService from '@/service/RecipeService';
import { Category, Difficulty, RecipeBody, User } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export default function CreateComponent({ user }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RecipeBody>({
    name: '',
    description: '',
    imageUrl: '',
    category: Category.Dessert,
    difficulty: Difficulty.Makkelijk,
  });

  const { trigger, isMutating, error } = useSWRMutation(
    '/api/recipes',
    RecipeService.createRecipe,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger(formData);
      mutate('/api/recipes');
      setStep(1);
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        category: Category.Dessert,
        difficulty: Difficulty.Makkelijk,
      });
    } catch (err: unknown) {
      console.error('Failed to create recipe:', err);
    }
  };

  if (!user) {
    return (
      <div className='mx-auto flex max-w-[1200px] px-6 pt-32'>
        <p className='text-center'>
          <Link href='/login'>
            <span className='font-bold text-red-500'>Log in</span>
          </Link>{' '}
          voordat je een recept publiceert!
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-[1200px] px-6 pt-32'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full flex-col gap-6 rounded-lg bg-white p-10 shadow-lg dark:bg-gray-800'
      >
        <h1 className='text-center text-3xl font-bold text-gray-900 dark:text-gray-100'>
          Nieuw recept maken
        </h1>

        {step === 1 && (
          <>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='name'
                className='font-medium text-gray-700 dark:text-gray-300'
              >
                Wat is de naam van je recept?
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='description'
                className='font-medium text-gray-700 dark:text-gray-300'
              >
                Hoe beschrijf je dit recept?
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                required
              />
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-500'
            >
              Volgende
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='imageUrl'
                className='font-medium text-gray-700 dark:text-gray-300'
              >
                Heb je een foto of afbeelding van het recept?
              </label>
              <input
                type='url'
                id='imageUrl'
                name='imageUrl'
                value={formData.imageUrl}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                required
              />
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
              >
                Terug
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-500'
              >
                Volgende
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='difficulty'
                className='font-medium text-gray-700 dark:text-gray-300'
              >
                Hoe moeilijk is dit recept?
              </label>
              <select
                id='difficulty'
                name='difficulty'
                value={formData.difficulty}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
              >
                <option value={Difficulty.Makkelijk}>Makkelijk</option>
                <option value={Difficulty.Gemiddeld}>Gemiddeld</option>
                <option value={Difficulty.Moeilijk}>Moeilijk</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='category'
                className='font-medium text-gray-700 dark:text-gray-300'
              >
                In welke categorie valt dit recept?
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
              >
                <option value={Category.Ontbijt}>Ontbijt</option>
                <option value={Category.Lunch}>Lunch</option>
                <option value={Category.Diner}>Diner</option>
                <option value={Category.Dessert}>Dessert</option>
                <option value={Category.Snack}>Snack</option>
                <option value={Category.Drankje}>Drankje</option>
              </select>
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500'
              >
                Terug
              </button>
              <button
                type='submit'
                disabled={isMutating}
                className='rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-500'
              >
                {isMutating ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
