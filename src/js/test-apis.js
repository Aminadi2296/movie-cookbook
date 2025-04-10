import { getRecipes } from './api.js';

async function testSpoonacular() {
  console.log("=== TEST STARTED ===");
  const recipes = await getRecipes("pasta");
  console.log("Final Results:", recipes);
  
  // Simple HTML display
  document.body.innerHTML = `
    <h1>Spoonacular API Test</h1>
    <h2>Results (check console for details):</h2>
    <pre>${JSON.stringify(recipes, null, 2)}</pre>
  `;
}

testSpoonacular();