import React from 'react';
import {theme} from './theme';
import { ThemeProvider } from '@material-ui/core';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Routes />
    </ThemeProvider>
  );
}

export default App;
