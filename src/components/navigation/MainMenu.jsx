import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Sizes } from '../../constants';
import Authentication from './Authentication';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${Sizes.drawerWidth}px)`,
    marginLeft: Sizes.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  hide: {
    display: 'none',
  },
  content: {
    paddingLeft: theme.spacing.unit * 10,
    paddingRight: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
});

const MainMenu = ({ classes, drawerOpen, handleDrawer }) => (
  <AppBar
    color="default"
    className={classNames(classes.appBar, {
      [classes.appBarShift]: drawerOpen,
    })}
  >
    <ToolBar disableGutters={!drawerOpen} className={classes.content}>
      <Typography
        variant="h6"
        className={classes.grow}
      >
        <IconButton
          aria-label="Open drawer"
          onClick={handleDrawer}
          className={classNames(classes.menuButton, drawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Button component={Link} to="/">DevCon.London</Button>
      </Typography>
      <Authentication />
    </ToolBar>
  </AppBar>
);

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainMenu);
