import moviesWithDishes from '../data/moviesWithDishes.json';
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

// Fetch recipes based on dish name
async function fetchRecipesForDish(dishName) {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(dishName)}&addRecipeInformation=true&number=3&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(`Recipes for ${dishName}:`, data);

    if (data.results && data.results.length > 0) {
      return data.results.map(recipe => ({
        title: recipe.title,
        id: recipe.id,
        url: `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`,
        image: recipe.image,
        instructions: recipe.instructions || 'No instructions available.'
      }));
    } else {
      console.warn(`No recipes found for dish: ${dishName}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function loadGenrePage() {
  console.log('loadGenrePage function is running');

  const genre = new URLSearchParams(window.location.search).get('type');
  console.log('Selected Genre:', genre);

  if (!genre) {
    console.error('No genre found in URL');
    window.location.href = '/';
    return;
  }

  // Update page title
  const pageTitleElement = document.getElementById('page-title');
  if (pageTitleElement) {
    pageTitleElement.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
  }
  document.title = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;

  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '<p>Loading movies...</p>';

  // Get movies from local JSON
  const genreMovies = moviesWithDishes[genre];
  if (!genreMovies || genreMovies.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found for this genre.</p>';
    return;
  }

  const moviesWithRecipes = [];

  for (const movie of genreMovies) {
    const recipes = await fetchRecipesForDish(movie.dish);

    if (recipes.length > 0) {
      const posterUrl = `https://imdb.iamidiotareyoutoo.com/photo/${movie.imdbId}`;

      moviesWithRecipes.push(`
        <div class="movie">
          <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" />
          
          <div class="movie-content">
            <h3>${movie.title} (${movie.year})</h3>
            <a href="movie.html?id=${movie.imdbId}" class="view-recipes-btn">View Recipes</a>
          </div>
      
          <div class="recipes" style="display: none;">
            ${recipes.map(recipe => `
              <div class="recipe">
                <h4>${recipe.title}</h4>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <div class="instructions">
                  <strong>Instructions:</strong> 
                  <p>${recipe.instructions}</p>
                </div>
                <a href="${recipe.url}" target="_blank">View Full Recipe</a>
                <button class="save-to-favorites" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}" data-url="${recipe.url}">Save to Favorites</button>
              </div>
            `).join('')}
          </div>
        </div>
      `);
    } else {
      console.log(`Skipping "${movie.title}" – no recipes found.`);
    }
  }

  if (moviesWithRecipes.length > 0) {
    moviesContainer.innerHTML = moviesWithRecipes.join('');
  } else {
    moviesContainer.innerHTML = '<p>No movies with matching recipes found.</p>';
  }

  // Add show/hide toggle
  document.querySelectorAll('.show-recipes').forEach(button => {
    button.addEventListener('click', (e) => {
      const movieCard = e.target.closest('.movie');
      const recipesContainer = movieCard.querySelector('.recipes');
      if (recipesContainer) {
        recipesContainer.style.display = recipesContainer.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // Add "Save to Favorites" button functionality
  document.querySelectorAll('.save-to-favorites').forEach(button => {
    button.addEventListener('click', (e) => {
      const recipe = {
        id: e.target.dataset.id,
        title: e.target.dataset.title,
        image: e.target.dataset.image,
        url: e.target.dataset.url
      };

      // Get existing favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      // Add the new recipe to the favorites array if it doesn't already exist
      if (!favorites.some(fav => fav.id === recipe.id)) {
        favorites.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${recipe.title} has been added to your favorites!`);
      } else {
        alert(`${recipe.title} is already in your favorites.`);
      }
    });
  });
}
