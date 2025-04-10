// src/js/api.js

// Fetch movies by genre from the server API
export async function fetchMoviesByGenre(genre) {
  console.log('Fetching movies for genre:', genre);  // Log genre

  // Construct the URL for fetching movies from the API
  const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(genre)}`;

  try {
    const response = await fetch(url);

    // If the response isn't OK, throw an error
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Fetched data:', data);  // Log the raw data

    // Check if the 'description' field contains movie data
    if (data.description && Array.isArray(data.description)) {
      console.log('Movies found:', data.description);  // Log movies

      // Map over the movie data and construct image URLs if needed
      const movies = data.description.map(movie => {
        // Ensure we check the actual field names from the API response
        const title = movie['#TITLE'];  // Check if field names are correct
        const imdbId = movie['#IMDB_ID'];  // Same for IMDB_ID
        const year = movie['#YEAR'];  // Same for YEAR

        // Construct the image URL (use placeholder if no IMDB ID exists)
        const imageUrl = imdbId
          ? `https://imdb.iamidiotareyoutoo.com/photo/${imdbId}`
          : 'https://via.placeholder.com/300';  // Fallback image if no IMDb ID

        // Return the movie data with proper properties
        return {
          title,
          image: imageUrl,
          year,
          imdbId,
        };
      });

      return movies;  // Return movies with image URLs
    } else {
      console.error('Movies data not found in the expected field.');
      return [];  // Return an empty array if no movies found
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];  // Return empty array if an error occurs
  }
}

// Fetch a recipe for a movie based on its title (this part remains the same)
export async function getRecipeForMovie(movieTitle) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&query=${movieTitle}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results && data.results[0] ? data.results[0] : null;
}
