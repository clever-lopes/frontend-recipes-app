import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import NotFound from '../pages/notFound/index';
import Profile from '../pages/profile/Profile';
import Recipes from '../pages/home/Recipes';
import Progress from '../pages/progress/Progress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id/in-progress" component={ Progress } />
      <Route path="/drinks/:id/in-progress" component={ Progress } />
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}
