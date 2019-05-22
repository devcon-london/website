import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { withStyles } from '@material-ui/core'

import { Sizes, NavItems } from '../../constants'

const styles = theme => ({
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
})

const MainDrawer = ({ classes, theme, open, handleDrawerClose }) => (
  <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      {NavItems.map(item => (
        <ListItem button key={item.text} component={Link} to={item.to}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
)

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(MainDrawer)
