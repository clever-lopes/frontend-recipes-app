import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Foods from '../pages/home/foods/index';
import NotFound from '../pages/notFound/index';
import Drinks from '../pages/home/drinks';
import Profile from '../pages/profile/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}
