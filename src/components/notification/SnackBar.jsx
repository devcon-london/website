import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { hideNotifications } from '../../state/reducers/ui'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
})

const SimpleSnackbar = ({ classes, open, message, hideNotifications }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={hideNotifications}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <Button
        key="close"
        color="secondary"
        size="small"
        onClick={hideNotifications}
      >
        CLOSE
      </Button>,
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={hideNotifications}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  hideNotifications: PropTypes.func.isRequired,
}

SimpleSnackbar.defaultProps = {
  message: null,
}

export default connect(
  ({ ui: { notifications } }) => ({
    open: notifications !== null,
    message: notifications || '',
  }),
  {
    hideNotifications,
  }
)(withStyles(styles)(SimpleSnackbar))
