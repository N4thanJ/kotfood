const getRecipes = async () => {
  try {
    const res = await fetch('/api/recipes/getRecipes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.error || 'Login failed');
    }

    return resData;
  } catch (err) {
    console.error('RecipeService login error:', err);
    throw err;
  }
};

const RecipeService = { getRecipes };

export default RecipeService;
