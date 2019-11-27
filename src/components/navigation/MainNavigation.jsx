import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from '@material-ui/core/'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import SnackBar from '../notification/SnackBar'
import { Sizes, NavItems } from '../../constants'
import Footer from '../footer/Footer'

import MainMenu from './MainMenu'
import Routes from './Routes'

const styles = theme => ({
  root: {
  },
  drawer: {
    width: Sizes.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: Sizes.drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'auto',
    // I can't seem to change the color via mui theme, F# annoying
    color: 'white',
    paddingTop: '84px',
    // paddingLeft: theme.spacing.unit * 10,
    // paddingRight: theme.spacing.unit * 10,
    // [theme.breakpoints.down('sm')]: {
    //   paddingLeft: theme.spacing.unit * 3,
    //   paddingRight: theme.spacing.unit * 3,
    // },
    // transition: theme.transitions.create('margin', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    // marginLeft: -Sizes.drawerWidth,
  },
})

class MainNavigation extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme, loggedIn, membership } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <MainMenu drawerOpen={open} handleDrawer={this.handleDrawerOpen} />
        {/* TMA: tried to move all this sh#t to a dedicated component but it breaks for unknown reasons */}
        <Drawer
          position="fixed"
          elevation={0}
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {NavItems.filter(item =>
              (item.visibility === 1 && !loggedIn) ||
              (item.visibility === 2 && membership)
                ? null
                : item
            ).map(item => (
              <ListItem
                button
                key={item.text}
                component={Link}
                onClick={() => {
                  this.handleDrawerClose()
                }}
                to={item.to}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <Routes />
          <SnackBar />
        </main>
        <Footer />
      </div>
    )
  }
}

MainNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  membership: PropTypes.bool,
}

const StyledMainNav = withStyles(styles, { withTheme: true })(MainNavigation)

export default connect(
  ({ user }) => ({
    loggedIn: user ? !!user.uid : false,
    membership: user ? user.membership : false,
  }),
  {}
)(StyledMainNav)
