const unDoneRecipe = (obj) => {
  const type = obj.Meal ? 'meals' : 'cocktails';
  const id = obj.idMeal || obj.idDrink;
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  delete inProgress[type][id];
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
};

export default unDoneRecipe;
