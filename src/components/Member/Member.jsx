import React from 'react'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import { SocialIcon } from 'react-social-icons'
import {
  Grid,
  Typography,
  Button,
  // IconButton,
  Fade,
  Popper,
  Paper,
  // Tooltip,
} from '@material-ui/core/'
import FaceIcon from '@material-ui/icons/Face'
import PopupState, { bindHover, bindPopper } from 'material-ui-popup-state'

const styles = theme => ({
  socialButton: {
    marginRight: '5px',
    height: '35px !important',
    width: '35px !important',
    cursor: 'pointer',
  },
  editButton: {
    margin: 'auto 0 auto auto',
  },
  buttonsContainer: {
    marginTop: '10px',
    display: 'flex',
  },
  nameCase: {
    textTransform: 'capitalize',
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
  },
  paperBio: {
    position: 'relative',
    padding: '0.25rem 1rem',
    maxWidth: '40vw',
    background: 'white',
    color: '#222',
  },
  popover: {
    pointerEvents: 'none',
  },
})

const Member = ({ classes, member, editable, onEdit }) => {
  return (
    <Grid item xs={12} sm={12} md={4} key={member.uid}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.nameCase}
          variant="h5"
        >{`${member.name.toLowerCase()}`}</Typography>
        <Typography
          className={classes.nameCase}
          variant="subtitle1"
        >{`${member.role}`}</Typography>
        <Typography variant="caption">
          {`member since ${moment(member.adminDate).format('MMM Do, YYYY')}`}
        </Typography>
        {/* {member.bio && <Typography>{member.bio}</Typography>} */}
        <Grid className={classes.buttonsContainer}>
          {member.bio && (
            <PopupState variant="popper" popupId="demo-popup-popper">
              {popupState => (
                <div>
                  <FaceIcon
                    className={classes.socialButton}
                    {...bindHover(popupState)}
                  />
                  <Popper
                    className={classes.popover}
                    {...bindPopper(popupState)}
                    transition
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paperBio}>
                          <Typography className={classes.typography}>
                            {member.bio}
                          </Typography>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          )}
          {member.github && (
            <SocialIcon
              className={classes.socialButton}
              url={member.github}
              bgColor="#212121"
              fgColor="#FFF"
              target="_blank"
            />
          )}
          {member.linkedin && (
            <SocialIcon
              className={classes.socialButton}
              url={member.linkedin}
              bgColor="#212121"
              fgColor="#FFF"
              target="_blank"
            />
          )}
          {member.twitter && (
            <SocialIcon
              className={classes.socialButton}
              url={member.twitter}
              bgColor="#212121"
              fgColor="#FFF"
              target="_blank"
            />
          )}
          {editable && (
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              onClick={onEdit}
            >
              edit
            </Button>
          )}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(Member)
