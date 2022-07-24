const getFavorites = () => {
  if (localStorage.favoriteRecipes) {
    return JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  return [];
};

export default getFavorites;
