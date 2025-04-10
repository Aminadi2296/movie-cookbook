// Spoonacular 
export async function getRecipes(query, limit = 6) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&query=${query}&number=${limit}`;
    const response = await fetch(url);
    return (await response.json()).results || [];
  }
  
  // Unofficial IMDb API
  export async function getIMDbMovies(query) {
    const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    return await response.json(); // Adjust based on actual response format
  }