'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import RecipePageComponent from '@/components/recipes/RecipePageComponent';
import RecipeService from '@/service/RecipeService';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function Recipe() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const onSave = (recipeId: string) => async (updatedContent: string) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to save recipe');

      mutate(`/api/recipes/${recipeId}`);
      alert('Recipe updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to save recipe');
    }
  };

  // Fetcher voor single recipe
  const fetcher = async (recipeId: string) => {
    return RecipeService.getRecipeByID(recipeId);
  };

  const {
    data: recipe,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/recipes/${id}` : null, () => fetcher(id!));

  if (isLoading) {
    return (
      <section className='flex h-[calc(100vh-15px)] items-center justify-center px-8 pt-20'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600'></div>
          <p className='text-gray-600'>Recept wordt geladen...</p>
        </div>
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <main>
        <Navigation user={user} darkerText />
        <div className='px-6 py-8 text-center text-red-600'>
          Recipe not found.
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navigation user={user} darkerText />
      <RecipePageComponent recipe={recipe} user={user} adminPreviewer={false} />
      <Footer />
    </main>
  );
}
