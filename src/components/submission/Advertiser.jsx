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

const Advertiser = ({ classes, submission}) => {
  const intro = (
    <Typography variant="body1" gutterBottom>
      {`introduced by ${submission.referrer} on ${moment(
        submission.date.seconds * 1000
      ).format('MMMM Do, YYYY')}`}
    </Typography>
  )

  return (
    <>
      <Typography variant="h5" color="secondary">
        {`Advertising Membership for ${submission.name}`}
      </Typography>
      {intro}
      <Typography variant="body1" gutterBottom>
        {`Role ${submission.role}. Company: ${submission.company}`}
      </Typography>
      <Grid className={classes.buttonsContainer}>
        {submission.linkedin && (
          <SocialIcon
            className={classes.socialButton}
            url={submission.linkedin}
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
      <Typography variant="body1" gutterBottom color="secondary">
        {`${submission.name} from ${submission.company} has submitted as an advertiser!`} Make sure you really want this submission before hitting the accept button!
      </Typography>
    </>
  )
}

export default withStyles(styles)(Advertiser)
