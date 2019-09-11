import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

const styles = theme => ({
  root: {
    maxWidth: '700px',
  },
  paper: {
    padding: '3rem 2rem',
    margin: '1rem',
  },
})

const Terms = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h3" gutterBottom>
      Terms
    </Typography>
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3" gutterBottom>
        Privacy.
      </Typography>
      <Typography component="p" variant="body1">
        All data is stored on Firebase, and only authenticated users can access
        it. Only members can see all other members' data.
      </Typography>
      <Typography component="p" variant="body1">
        Also, we only use cookies for the Google Analytics tracker.
      </Typography>
    </Paper>
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3" gutterBottom>
        Code of conduct.
      </Typography>
      <Typography component="p" variant="body1">
      Please refer to Code of Conduct <Link href='https://github.com/devcon-london/Code-Of-Conduct' rel="noopener noreferrer" target='_blank'>Github repository.</Link>
      </Typography>
    </Paper>
  </div>
)

export default withStyles(styles)(Terms)
