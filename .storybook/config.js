import React from 'react'
import { configure, addDecorator } from '@storybook/react';

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { appTheme } from '../src/theme'

const req = require.context('../src', true, /stories.js(x?)$/);

const Decorator = (storyFn) => (
  <MuiThemeProvider theme={appTheme}>
    <CssBaseline />
    {storyFn()}
  </MuiThemeProvider>
)

addDecorator(Decorator)

configure(() => req.keys().forEach(req), module);