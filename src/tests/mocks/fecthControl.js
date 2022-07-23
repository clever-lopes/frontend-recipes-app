import drinksCategories from './drinksCategories';
import meals from './mealsMock';
import drinks from './drinksMock';
import beefMeals from './beefMock';
import chickenMeals from './chickenMock';
import withApple from './mealsWithApple';
import CORBA from './corba';
import A1_DRINK from './a1Drink';
import spaghettiMeal from './spaghettiMock';
import aquamarine from './aquamarineMock';
import leblebiSoup from './leblebiMock';
import ggCocktail from './ggMock';
import drinkSemCat from './drinkSemCategory';
import drinkByLetter from './drinksByLetter';
import cocktailDrinks from './cocktailMock';
import cocoaDrinks from './cocoaMock';
import mealCategories from './mealCategories';
import MEAL_BY_IGREDIENTE from './mealByIgrediente';
import drinksByIgredients from './drinksByIgredients';

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
        case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=01234':
          return Promise.resolve({ meals: null });
        case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52973':
          return Promise.resolve(leblebiSoup);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=A1':
          return Promise.resolve(A1_DRINK);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222':
          return Promise.resolve(A1_DRINK);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997':
          return promises.resolve(ggCocktail);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319':
          return Promise.resolve(aquamarine);
        case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771':
          return Promise.resolve(spaghettiMeal);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=127222':
          return Promise.resolve(drinkSemCat);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a':
          return Promise.resolve(drinkByLetter);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=xx':
          return Promise.resolve({ drinks: null });
          case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail':
          return Promise.resolve(cocktailDrinks);
          case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa':
          return Promise.resolve(cocoaDrinks);
          case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken':
            return Promise.resolve(MEAL_BY_IGREDIENTE);
          case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka':
            return Promise.resolve(drinksByIgredients);
        default:
          break;
      }
    }
  });
}
