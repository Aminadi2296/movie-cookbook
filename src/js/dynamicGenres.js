export const GENRES = [
  { id: 'animated', name: 'Animated', color: '#FEDB71' },
  { id: 'action', name: 'Action', color: '#e74c3c' },
  { id: 'romance', name: 'Romance', color: '#e91e63' },
  { id: 'classic', name: 'Classic', color: '#389C9A' }
];

export function initGenreNavigation() {
  const container = document.getElementById('genre-container');
  if (!container) return;

  container.innerHTML = GENRES.map(genre => `
    <div class="genre-card" 
         style="background: ${genre.color}"
         data-genre="${genre.id}">
      <h2>${genre.name}</h2>
      <p>View recipes</p>
    </div>
  `).join('');

  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      const genre = card.dataset.genre;
      window.location.href = `genre.html?type=${genre}`;
    });
  });
}
