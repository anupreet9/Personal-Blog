import React from 'react';
import './App.css';
import AppUser from './user/index'
import Admin from './admin';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <AppUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
