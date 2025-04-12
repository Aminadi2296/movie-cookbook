export const GENRES = [
  { id: 'animated', name: 'Animated', color: '#FEDB71' },
  { id: 'action', name: 'Action', color: '#e74c3c' },
  { id: 'romance', name: 'Romance', color: '#e91e63' },
  { id: 'classic', name: 'Classic', color: '#389C9A' }
];

// Function to initialize genre navigation
export function initGenreNavigation() {
  const container = document.getElementById('genre-container');
  if (!container) return; // Ensure it only runs on the homepage

  // Dynamically generate genre cards
  container.innerHTML = GENRES.map(genre => `
    <div class="genre-card ${genre.id}" data-genre="${genre.id}">
    <h2>${genre.name}</h2>
    <p>View recipes</p>
  </div>
`).join('');

  // Add event listeners to each genre card
  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      const genre = card.dataset.genre;
      window.location.href = `/genre.html?type=${genre}`; // Redirect to genre page
    });
  });
}
