import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login/Login';
import Recipes from '../pages/home/Recipes';
import NotFound from '../pages/notFound/index';

export default function Routes() {
  return (
    <Switch>
      <Router>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Recipes } />
        <Route path="*" component={ NotFound } />
      </Router>
    </Switch>
  );
}
