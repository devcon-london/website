import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Authentication from './Authentication';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

const MainMenu = ({ classes }) => (
  <AppBar>
    <ToolBar>
      <Typography
        variant="h6"
        className={classes.grow}
      >
        <Button component={Link} to="/">DevCon.London</Button>
      </Typography>
      <Button component={Link} to="/terms">Terms</Button>
      <Button component={Link} to="/subscribe">Subscribe</Button>
      {/* nothing here yet! */}
      {/* <Button component={Link} to="/events">Events</Button> */}
      <Button component={Link} to="/members">Members</Button>
      <Button component={Link} to="/submissions">Submissions</Button>
      <Authentication />
    </ToolBar>
  </AppBar>
);

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);
