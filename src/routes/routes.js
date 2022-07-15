import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login/Login';
import Foods from '../pages/home/foods/index';
import NotFound from '../pages/notFound/index';

export default function Routes() {
  return (
    <Switch>
      <Router>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
        <Route path="/*" component={ NotFound } />
      </Router>
    </Switch>
  );
}
