import { loadPartials } from './utils.js';

loadPartials();

document.addEventListener('DOMContentLoaded', () => {
  const favoritesList = document.getElementById('favorites-container');

  function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Favorites from localStorage:', favorites);

    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p>No favorite recipes yet. Add some from the genre pages!</p>';
      return;
    }

    favoritesList.innerHTML = favorites.map(recipe => `
      <div class="favorite-recipe">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-details">
          <h3>${recipe.title}</h3>
          <div class="button-group">
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            <button class="remove-favorite" data-id="${String(recipe.id)}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // ✅ Attach event listeners
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', (e) => {
        const recipeId = e.target.dataset.id;

        // Reload current favorites from localStorage in case of changes
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Filter using string comparison to avoid type mismatch
        const updatedFavorites = currentFavorites.filter(recipe => String(recipe.id) !== recipeId);

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        renderFavorites(); // Refresh UI
      });
    });
  }

  renderFavorites();
});
