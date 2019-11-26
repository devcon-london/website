import { createMuiTheme } from '@material-ui/core/styles'

export const appTheme = createMuiTheme({
  typography: {
    htmlFontSize: 16,
    h2: {
      fontSize: '1.5rem',
      letterSpacing: '0.1px'
    }, 
    h1: {
      fontFamily: "'Sulphur Point', sans-serif;",
      fontSize: '2.5rem'
    },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
  },
  palette: {
    background: {
      default: '#222',
      paper: '#282828',
    },
    type: 'dark',
  },
})