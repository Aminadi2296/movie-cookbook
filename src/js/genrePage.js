console.log('genrePage.js loaded');  // Ensure the file is loading

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

// Helper to fetch recipes
async function fetchRecipesForMovie(movieTitle) {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(movieTitle)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('Spoonacular Data:', data);
    if (data.results && data.results.length > 0) {
      return data.results.map(recipe => ({
        title: recipe.title,
        id: recipe.id,
        url: `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`,
        image: recipe.image,
        instructions: recipe.instructions || 'No instructions available.'
      }));
    } else {
      console.error(`No recipes found for: ${movieTitle}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching recipes data:', error);
    return [];
  }
}

export async function loadGenrePage() {
  console.log('loadGenrePage function is running');  // Check if the function is running

  try {
    // Get the genre from the URL (for example, ?type=action)
    const genre = new URLSearchParams(window.location.search).get('type');
    console.log('Selected Genre:', genre);  // Check the selected genre

    if (!genre) {
      console.error('No genre found in URL');
      return window.location.href = '/';  // Redirect if no genre found
    }

    // Check if the page-title element exists and update the content
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
      console.log('Page title element found:', pageTitleElement);  // Ensure the element exists
      pageTitleElement.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;  // Update title
    } else {
      console.error('Page title element not found!');
    }

    // Dynamically update the browser tab title as well
    document.title = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
    console.log('Browser tab title updated to:', document.title);  // Log the new tab title

    // Fetch movies for the genre (make sure api.js is working correctly)
    const movies = await fetchMoviesByGenre(genre);  // Using the existing fetch function
    console.log('Fetched Movies:', movies);

    // If no movies are found, display a message
    const moviesContainer = document.getElementById('movies-container');
    if (movies.length === 0) {
      moviesContainer.innerHTML = 'No movies found for this genre.';
      return;
    }

    // Display movies that have recipes
    const filteredMovies = await Promise.all(movies.map(async (movie) => {
      const recipes = await fetchRecipesForMovie(movie.title);  // Fetch recipes for the movie

      // If the movie has at least one recipe, return the movie
      if (recipes.length > 0) {
        return `
          <div class="movie">
            <h3>${movie.title} (${movie.year})</h3>
            <img src="${movie.image}" alt="${movie.title}" />
            <button class="show-recipes" data-recipes="${JSON.stringify(recipes)}">Show Recipes</button>
            <div class="recipes" style="display: none;">
              ${recipes.map(recipe => `
                <div class="recipe">
                  <h4>${recipe.title}</h4>
                  <img src="${recipe.image}" alt="${recipe.title}" />
                  <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                  <a href="${recipe.url}" target="_blank">View Recipe</a>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      return null;
    }));

    // Filter out null movies (movies without recipes)
    moviesContainer.innerHTML = filteredMovies.filter(Boolean).join('');
    
    // Add event listeners to toggle the recipe display
    document.querySelectorAll('.show-recipes').forEach(button => {
      button.addEventListener('click', (e) => {
        const recipesContainer = e.target.nextElementSibling;
        recipesContainer.style.display = recipesContainer.style.display === 'none' ? 'block' : 'none';
      });
    });

  } catch (error) {
    console.error('Error loading genre page:', error);
  }
}

// Fetch movies by genre from the API
async function fetchMoviesByGenre(genre) {
  const apiUrl = `https://imdb.iamidiotareyoutoo.com/search?q=${genre}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.ok && Array.isArray(data.description)) {
      return data.description.map(item => ({
        title: item['#TITLE'] || 'No Title',
        image: item['#IMG_POSTER'] || 'path/to/fallback-image.jpg',
        year: item['#YEAR'] || 'No Year',
        imdbId: item['#IMDB_ID']
      }));
    } else {
      console.error('Error fetching movie data:', data.error_code);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies from API:', error);
    return [];
  }
}
