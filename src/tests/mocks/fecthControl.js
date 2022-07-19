import drinksCategories from "./drinksCategories";
import meals from "./mealsMock";
import mealCategories from "./mealCategories";
import drinks from "./drinksMock";
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
                case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
                return Promise.resolve(drinks);
                default:
                    break;
            }
        }
    })
}
