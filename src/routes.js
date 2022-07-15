import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/login/Login';
import Recipes from './pages/home/recipes/Recipes';
import NotFound from './pages/notFound/index';
import RecipeDetails from './pages/details/RecipeDetails';

export default function Routes() {
  return (
    <Switch>
      <Router>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Recipes } />
        <Route path="/recipe-details/:id" component={ RecipeDetails } />
        <Route path="/*" component={ NotFound } />
      </Router>
    </Switch>
  );
}
