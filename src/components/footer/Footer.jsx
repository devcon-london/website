import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  footer: {
    padding: '1rem 2rem',
    background: '#202020',
  },
  copy: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: 'inherit',
    textDecoration: 'underline',
  },
})

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <Typography variant="caption" className={classes.copy}>
      <span>Copyright © 2019 DevCon</span>
      <Link className={classes.link} to="privacy">
        Privacy & Policy
      </Link>
    </Typography>
  </footer>
)

export default withStyles(styles, { withTheme: true })(Footer)
