import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import MainNavigation from './components/navigation/MainNavigation';

import store from './state/store';

import './App.css';

const appTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        <MainNavigation />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
