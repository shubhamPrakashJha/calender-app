import React from 'react';
import {theme} from './theme';
import { ThemeProvider } from '@material-ui/core';
import Router from './Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router />
    </ThemeProvider>
  );
}

export default App;
