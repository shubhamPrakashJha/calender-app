/* React */
import React from 'react';

/* React-router */
import { Switch, Route } from 'react-router-dom';

/* Components Imports */
import Home from './pages/Home';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
