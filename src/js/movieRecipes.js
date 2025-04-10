import { getRecipes } from './api.js';

const MOVIE_RECIPE_MAP = {
  // Explicit mappings take priority
  'ratatouille': 'ratatouille',
  'the godfather': 'pasta',
  'julie & julia': 'boeuf bourguignon',
  // Add more...
};

export async function getRecipeForMovie(movieTitle) {
  // 1. Check for explicit mapping
  const lowerTitle = movieTitle.toLowerCase();
  const mappedQuery = MOVIE_RECIPE_MAP[lowerTitle];
  
  // 2. Fallback to title-based search
  const query = mappedQuery || lowerTitle.split(' ')[0] + ' recipe';
  
  // 3. Fetch from Spoonacular
  const recipes = await getRecipes(query, 1);
  return recipes[0] || null;
}