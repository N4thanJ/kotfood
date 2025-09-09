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

const RecipeService = { getRecipes, getRecipeByID };

export default RecipeService;
