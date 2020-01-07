import React from 'react'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'

import { SocialIcon } from 'react-social-icons'
import EmailIcon from '@material-ui/icons/Email'
import { Input, Grid, Typography, Fab } from '@material-ui/core'

const styles = theme => ({
  socialButton: {
    marginRight: '10px',
  },
  buttonsContainer: {
    marginTop: '20px',
    display: 'flex',
    marginBottom: '20px',
  },
  paperEmail: {
    display: 'flex',
    marginRight: '0',
    marginLeft: 'auto',
    alignItems: 'center',
  },
})

const Member = ({ classes, submission }) => {
  const intro = (
    <Typography variant="body1" gutterBottom>
      {`introduced by ${submission.referrer} on ${moment(
        submission.date.seconds * 1000
      ).format('MMMM Do, YYYY')}`}
    </Typography>
  )

  return (
    <>
      <Typography variant="h5" color="primary">
        {`Community Membership for ${submission.name}, ${submission.role}`}
      </Typography>
      {intro}
      <Typography variant="body1" gutterBottom>
        {`Bio: ${submission.bio}`}
      </Typography>
      <Grid className={classes.buttonsContainer}>
        {submission.github && (
          <SocialIcon
            className={classes.socialButton}
            url={submission.github}
            bgColor="#212121"
            fgColor="#FFF"
            target="_blank"
          />
        )}
        {submission.linkedin && (
          <SocialIcon
            className={classes.socialButton}
            url={submission.linkedin}
            bgColor="#212121"
            fgColor="#FFF"
            target="_blank"
          />
        )}
        {submission.twitter && (
          <SocialIcon
            className={classes.socialButton}
            url={submission.twitter}
            bgColor="#212121"
            fgColor="#FFF"
            target="_blank"
          />
        )}
        <Grid className={classes.paperEmail}>
          <Input
            readOnly
            value={submission.email}
            onClick={e => e.target.select()}
          />
          <Fab size="small" color="primary" aria-label="mailto">
            <EmailIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Member)
