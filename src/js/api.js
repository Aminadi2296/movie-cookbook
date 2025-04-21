// Fetch up to 3 full recipes for a movie based on its associated dish
export async function getRecipeForMovie(dish, number = 3) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${encodeURIComponent(dish)}&number=${number}`;

  try {
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) {
      return [];
    }

    // Fetch full info for each recipe (to get sourceUrl and other details)
    const fullRecipes = await Promise.all(
      searchData.results.map(async (recipe) => {
        const detailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
        const detailResponse = await fetch(detailUrl);
        const detailData = await detailResponse.json();

        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          sourceUrl: detailData.sourceUrl
        };
      })
    );

    return fullRecipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}
