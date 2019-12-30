import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { appTheme } from './theme'

import MainNavigation from './components/navigation/MainNavigation'

import store from './state/store'

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        <MainNavigation />
      </MuiThemeProvider>
    </Router>
  </Provider>
)

export default App
