// src/js/api.js

// Fetch recipes for a given query (used in genre page)
export async function getRecipes(query, limit = 6) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&query=${query}&number=${limit}`;
  const response = await fetch(url);
  return (await response.json()).results || [];
}

// Fetch movies by genre from IMDb (or use another API)
export async function fetchMoviesByGenre(genre) {
  const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(genre)}`;

  console.log('Fetching movies for genre:', genre);  // Log genre
  console.log('Request URL:', url);  // Log the URL being requested

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);  // Log the raw data

    // Return the results or an empty array if nothing is found
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;  // Rethrow the error to be caught in the caller
  }
}


// Fetch a recipe for a movie based on its title
export async function getRecipeForMovie(movieTitle) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&query=${movieTitle}`;
  const response = await fetch(url);
  const data = await response.json();
  // Return the first recipe or null if none found
  return data.results && data.results[0] ? data.results[0] : null;
}
