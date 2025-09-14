'use client';

import RecipeService from '@/service/RecipeService';
import { Category, Difficulty, RecipeBody, User } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';

interface Props {
  user: Pick<User, 'id' | 'email' | 'username' | 'role'> | null;
}

export function getAllCategories(): Category[] {
  return Object.values(Category) as Category[];
}

export function getAllDifficulties(): Difficulty[] {
  return Object.values(Difficulty) as Difficulty[];
}

export default function CreateComponent({ user }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RecipeBody>({
    name: '',
    description: '',
    imageUrl: '',
    category: Category.Dessert,
    difficulty: Difficulty.Makkelijk,
  });

  const difficulties = getAllDifficulties();
  const categories = getAllCategories();

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
      const response = await trigger(formData);
      mutate('/api/recipes');

      const createdRecipe = await response.json();

      if (createdRecipe?.id) {
        router.push(`/recipes/${createdRecipe.id}`);
      }

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
        className='flex w-full flex-col gap-6 rounded-lg bg-white p-10 shadow-lg'
      >
        <h1 className='text-center text-3xl font-bold text-gray-900'>
          Nieuw recept maken
        </h1>

        {step === 1 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='name' className='font-medium text-gray-700'>
                Wat is de naam van je recept?
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='description'
                className='font-medium text-gray-700'
              >
                Hoe beschrijf je dit recept?
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
                required
              />
            </div>

            <button
              type='button'
              onClick={handleNext}
              className='hover:bg-lime-600:bg-lime-500 rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors'
            >
              Volgende
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='imageUrl' className='font-medium text-gray-700'>
                Heb je een foto of afbeelding van het recept?
              </label>
              <input
                type='url'
                id='imageUrl'
                name='imageUrl'
                value={formData.imageUrl}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
                required
              />
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='hover:bg-gray-400:bg-gray-500 rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800'
              >
                Terug
              </button>
              <button
                type='button'
                onClick={handleNext}
                className='hover:bg-lime-600:bg-lime-500 rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors'
              >
                Volgende
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className='flex flex-col gap-2'>
              <label htmlFor='difficulty' className='font-medium text-gray-700'>
                Hoe moeilijk is dit recept?
              </label>
              <select
                id='difficulty'
                name='difficulty'
                value={formData.difficulty}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='category' className='font-medium text-gray-700'>
                In welke categorie valt dit recept?
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='rounded-md border border-gray-300 bg-gray-100 px-3 py-2'
              >
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className='font-medium text-red-500'>
                {error ||
                  'Er is iets misgegaan bij het aanmaken van het recept.'}
              </p>
            )}

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleBack}
                className='hover:bg-gray-400:bg-gray-500 rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800'
              >
                Terug
              </button>
              <button
                type='submit'
                disabled={isMutating}
                className='hover:bg-lime-600:bg-lime-500 rounded-full bg-lime-500 px-4 py-2 font-medium text-white transition-colors'
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
