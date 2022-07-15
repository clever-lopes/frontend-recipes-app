import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import NotFound from '../pages/notFound/index';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/home';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Home } />
      <Route path="/drinks" component={ Home } />
      <Route path="/profile" component={ Profile } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}
