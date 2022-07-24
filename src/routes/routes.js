import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Recipes from '../pages/home/Recipes';
import Progress from '../pages/progress/RecipeInProgress';
import RecipeDetails from '../pages/details/RecipeDetails';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notFound';
import DoneRecipes from '../pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from '../pages/favorite/FavoriteRecipes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id/in-progress" component={ Progress } />
      <Route path="/drinks/:id/in-progress" component={ Progress } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}
