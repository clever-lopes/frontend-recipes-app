const formatTags = (tagStr) => {
  const tagArray = tagStr.split(',');
  console.log(tagArray);
  return tagArray;
};

const addDoneRecipe = (prodInfo) => {
  let doneRecipes;
  const date = new Date();
  console.log(prodInfo.Tags);
  const newItem = {
    id: prodInfo.idMeal || prodInfo.idDrink,
    type: prodInfo.Meal ? 'food' : 'drink',
    nationality: prodInfo.Area || '',
    category: prodInfo.Category || '',
    alcoholicOrNot: prodInfo.Alcoholic || '',
    name: prodInfo.Meal || prodInfo.Drink,
    image: prodInfo.MealThumb || prodInfo.DrinkThumb,
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: formatTags(prodInfo.Tags || ''),
  };
  if (localStorage.doneRecipes) {
    doneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes')), newItem];
  } else {
    doneRecipes = [newItem];
  }
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export default addDoneRecipe;
