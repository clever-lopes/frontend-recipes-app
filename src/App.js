import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
