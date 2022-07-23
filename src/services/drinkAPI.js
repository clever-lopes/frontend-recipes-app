// API de bebidas.

import mealFormat from './helpers/mealFormat';
import formatCategory from './helpers/formatCategory';

async function name(word) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${word}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.drinks));
}

async function firstLetter(letter) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.drinks));
}

// async function getIngridientByName(word) {
//   return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${word}`)
//     .then((res) => res.json())
//     .then((res) => formatCategory(res.ingredients));
// }

async function getById(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.drinks)[0]);
}

// async function getIngredientById() {
//   return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid==${word}`)
//     .then((res) => res.json())
//     .then((res) => formatCategory(res.ingredients));
// }

// async function randomOne() {
//   return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
//     .then((res) => res.json())
//     .then((res) => mealFormat(res.drinks)[0]);
// }

async function filterByIngredient(ingredient) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((res) => res.json())
    .then((res) => formatCategory(res.drinks));
}

// async function filterByAlcoholic(isAlcoholic) {
//   const endpoint = isAlcoholic
//     ? 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
//     : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
//   return fetch(endpoint)
//     .then((res) => res.json())
//     .then((res) => formatCategory(res.drinks));
// }

async function filterByCategory(category) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((res) => formatCategory(res.drinks));
}

async function getCategories() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => formatCategory(res.drinks));
}

const drinkAPI = {
  name,
  firstLetter,
  // getIngridientByName,
  getById,
  // getIngredientById,
  filterByIngredient,
  // filterByAlcoholic,
  filterByCategory,
  getCategories,
};

export default drinkAPI;
