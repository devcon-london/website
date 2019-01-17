import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

import MainMenu from './components/navigation/MainMenu';

import Home from './pages/home/Home';
import Terms from './pages/terms/Terms';
import Subscribe from './pages/subscribe/Subscribe';
import Events from './pages/events/Events';
import Members from './pages/members/Members';
import Submissions from './pages/submissions/Submissions';

import store from './state/store';

import './App.css';

const appTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#27abe1',
    },
    secondary: {
      main: '#ec1b24',
    },
  },
});

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: '64px',
    color: '#fff',
    backgroundColor: '#333',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

const Routes = () => (
  <React.Fragment>
    <Route path="/" exact component={Home} />
    <Route path="/terms" component={Terms} />
    {/* shown when not authenticated or authenticated and not a member */}
    <Route path="/subscribe" component={Subscribe} />
    {/* shown when authenticated and member */}
    <Route path="/events" component={Events} />
    <Route path="/members" component={Members} />
    {/* shown when authenticated, member and admin */}
    <Route path="/submissions" component={Submissions} />
  </React.Fragment>
);

const App = ({ classes }) => (
  <Provider store={store}>
    <CssBaseline />
    <Router>
      <MuiThemeProvider theme={appTheme}>
        <div className="App">
          <MainMenu />
          <main className={classes.content}>
            <Routes />
          </main>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
