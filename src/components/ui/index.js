import React from 'react'
import { Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  section: {
    position: 'relative',
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
    maxWidth: '1440px',
    minWidth: '300px',
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80vw',
    background: 'transparent'
  }, 
  paperBox: {
    padding: theme.spacing(3),
    margin: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80vw',
  }
})

export const Title = ({ children }) => (
  <Typography variant="h1" gutterBottom>
    {children}
  </Typography>
)

export const Section = withStyles(styles)(({ classes, children }) => (
  <section className={classes.section}>{children}</section>
))

export const Container = withStyles(styles)(({ classes, children }) => (
  <Paper elevation={0} className={classes.paper}>{children}</Paper>
))

export const PaperContainer = withStyles(styles)(({ classes, children }) => (
  <Paper className={classes.paperBox}>{children}</Paper>
))