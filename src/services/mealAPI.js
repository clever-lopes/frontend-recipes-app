// API de comidas.

import mealFormat from './helpers/mealFormat';
import formatCategory from './helpers/formatCategory';

async function name(word) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.meals));
}

async function firstLetter(letter) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.meals));
}

async function getById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.meals)[0]);
}

// async function randomOne() {
//   return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
//     .then((res) => res.json())
//     .then((res) => mealFormat(res.meals)[0]);
// }

async function getCategories() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((res) => res.json())
    .then((res) => formatCategory(res.meals));
}

// async function getAreas() {
//   return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
//     .then((res) => res.json())
//     .then((res) => formatCategory(res.meals));
// }

async function filterByIngredient(ingredient) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((res) => res.json())
    .then((res) => formatCategory(res.meals));
}

// async function filterByArea(area) {
//   return fetch(`www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
//     .then((res) => res.json())
//     .then((res) => formatCategory(res.meals));
// }

async function filterByCategory(category) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((res) => mealFormat(res.meals));
}

const mealAPI = {
  name,
  firstLetter,
  getById,
  getCategories,
  filterByIngredient,
  filterByCategory,
};

export default mealAPI;
