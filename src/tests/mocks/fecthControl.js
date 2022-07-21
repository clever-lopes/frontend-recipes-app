import drinksCategories from './drinksCategories';
import meals from './mealsMock';
import mealCategories from './mealCategories';
import drinks from './drinksMock';
import beefMeals from './beefMock';
import chickenMeals from './chickenMock';
import withApple from './mealsWithApple';
import CORBA from './corba';
import A1_DRINK from './a1Drink';

export default function mockFetch(endpoint) {
  return Promise.resolve({
    json: () => {
      switch (endpoint) {
        case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(mealCategories);
        case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(drinksCategories);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
          return Promise.resolve(meals);
        case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef':
          return Promise.resolve(beefMeals);
        case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken':
          return Promise.resolve(chickenMeals);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
          return Promise.resolve(drinks);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Apple':
          return Promise.resolve(withApple);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba':
          return Promise.resolve(CORBA);
        case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977':
          return Promise.resolve(CORBA);
          case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A1':
          return Promise.resolve(A1_DRINK);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222':
          return Promise.resolve(A1_DRINK);
        default:
          break;
      }
    }
  });
}
