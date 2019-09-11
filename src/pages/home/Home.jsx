import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    maxWidth: '700px',
  },
  paper: {
    padding: '3rem 2rem',
    margin: '1rem'
  },
})


const Home = ({classes}) => (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Welcome.
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3" gutterBottom>
          What is Devcon.London?
        </Typography>
        <Typography component="p" variant="body1">
          Devcon.London is an invitation-only community of developers.
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3" gutterBottom>
          How do I get in?
        </Typography>
        <Typography component="p" variant="body1">
          You should know someone who is already in and willing to invite
          you.
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3" gutterBottom>
          Why is this community so private?
        </Typography>
        <Typography component="p" variant="body1">
          Because we believe that keeping strong relationships between our
          members is healthy and granting access on an invite-basis is a way of
          doing so. Also, we can guarantee privacy for our members and avoid
          unsolicited contacts from people who are not interested in the
          community.
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3" gutterBottom>
          OK, I have an invite, how do I get in now?
        </Typography>
        <Typography component="p" variant="body1">
          Login using your Github account, then head to the subscribe page
          and fill the form. One of the admins will review your submission and
          let you in.
        </Typography>
      </Paper>
    </div>
  )

export default withStyles(styles)(Home)