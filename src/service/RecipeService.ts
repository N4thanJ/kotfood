import { RecipeBody } from '@/types';

const getRecipes = async () => {
  try {
    const res = await fetch('/api/recipes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error || 'Getting recipes failed');
    }

    return resData;
  } catch (err) {
    console.error('RecipeService getting recipes error:', err);
    throw err;
  }
};

const getRecipeByID = async (id: string) => {
  try {
    const res = await fetch(`/api/recipes/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error || 'Getting recipe by id failed');
    }

    return resData;
  } catch (err) {
    console.error('Getting recipe by id failed:', err);
    throw err;
  }
};

const getMyRecipes = async (id: string) => {
  try {
    const res = await fetch(`/api/recipes?mine=true`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error || 'Getting your recipes failed');
    }

    return resData;
  } catch (err) {
    console.error('Getting your recipes failed:', err);
    throw err;
  }
};

const createRecipe = async (url: string, { arg }: { arg: RecipeBody }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create recipe');
    }

    return res;
  } catch (err) {
    console.error('Getting recipe by id failed:', err);
    throw err;
  }
};

const RecipeService = { getRecipes, getRecipeByID, getMyRecipes, createRecipe };

export default RecipeService;
