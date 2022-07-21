export const addFavorite = (prodInfo) => {
  const favObject = {
    id: prodInfo.idMeal || prodInfo.idDrink,
    type: prodInfo.Meal ? 'food' : 'drink',
    nationality: prodInfo.Area || '',
    category: prodInfo.Category || '',
    alcoholicOrNot: prodInfo.Alcoholic || '',
    name: prodInfo.Meal || prodInfo.Drink,
    image: prodInfo.MealThumb || prodInfo.DrinkThumb,
  };
  if (localStorage.favoriteRecipes) {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...favRecipes, favObject]));
  } else {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([favObject]));
  }
};

export const removeFavorite = (id) => {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .filter((item) => item.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
};

const readsFavorite = (id) => {
  if (localStorage.favoriteRecipes) {
    return JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((item) => item.id === id);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  return false;
};

export default readsFavorite;
