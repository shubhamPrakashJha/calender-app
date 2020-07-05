/* React */
import React from 'react';

/* React-router */
import { Switch, Route } from 'react-router-dom';

/* Components Imports */
import Home from './pages/Home';
import AppLayout from './layouts/AppLayout';
import Calender from './pages/Calender';

const Router = () => {
  return (
    <Switch>
      <AppLayout>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/calender">
          <Calender />
        </Route>
      </AppLayout>
    </Switch>
  );
};

export default Router;
