import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

let openSnackbarFn;

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackBar;
  }

  openSnackBar = (message) => {
    this.setState({
      open: true,
      message,
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { open, message } = this.state;
    const { classes } = this.props;
    const msg = <span id="message-id">{message}</span>;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={msg}
        action={[
          <Button key="close" color="secondary" size="small" onClick={this.handleClose}>
            CLOSE
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export function openSnackbar(message) {
  openSnackbarFn(message);
}

export default withStyles(styles)(SimpleSnackbar);
