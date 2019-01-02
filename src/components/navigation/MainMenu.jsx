import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import Authentication from './Authentication';

const MainMenu = () => (
  <AppBar>
    <ToolBar>
      <IconButton aria-label="Open drawer" color="inherit">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit">
        <Link to="/">DevCon.London</Link>
      </Typography>
      <Button><Link to="/terms">Terms</Link></Button>
      <Button><Link to="/subscribe">Subscribe</Link></Button>
      <Button><Link to="/events">Events</Link></Button>
      <Button><Link to="/members">Members</Link></Button>
      <Button><Link to="/submissions">Submissions</Link></Button>
      <Authentication />
    </ToolBar>
  </AppBar>
);

export default MainMenu;
