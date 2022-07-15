import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/foods/index';
import Login from './pages/login/Login';
import NotFound from './pages/notFound';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Home } />
      <Route path="/profile" component={ Profile } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default App;
