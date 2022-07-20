import drinksCategories from './drinksCategories';
import meals from './mealsMock';
import mealCategories from './mealCategories';
import beefMeals from './beefMock';

export const mealsNerfed = { meals: meals.meals.slice(0, 10) };
export const beefMealsNerfed = { meals: beefMeals.meals.slice(0, 10) };
export default function mockSmallFetch(endpoint) {
  return Promise.resolve({
    json: () => {
      switch (endpoint) {
        case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(mealCategories);
        case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(drinksCategories);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
          return Promise.resolve(mealsNerfed);
        case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
          return Promise.resolve(beefMealsNerfed);

        default:
          break;
      }
    }
  });
}
