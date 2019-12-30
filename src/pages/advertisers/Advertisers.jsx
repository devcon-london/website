import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { SocialIcon } from 'react-social-icons'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Title, Section, Container } from '../../components/ui'

import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/reducers/ui'

const { db } = window

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
})

class Advertisers extends React.Component {
  state = {
    advertisers: [],
    error: null,
  }

  componentDidMount() {
    const { user } = this.props
    if (user.uid !== null) {
      this.advertisersUnsubscribe = db
        .collection(DBCollections.advertisers)
        .onSnapshot(
          snapshot => {
            const advertisers = []
            snapshot.forEach(doc => {
              advertisers.push(doc.data())
            })
            this.setState({ advertisers, error: null })
          },
          error => {
            this.setState({
              advertisers: [],
              error: Errors.sectionPermission,
            })
          }
        )
    }
  }

  componentWillUnmount() {
    if (this.advertisersUnsubscribe) {
      this.advertisersUnsubscribe()
    }
  }

  render() {
    const { user, showNotifications, classes } = this.props
    const { advertisers, error } = this.state
    let content = null

    if (user.uid === null) {
      // user not logged in
      showNotifications(Errors.loginFirst)
      content = <Redirect to="/" />
    } else if (advertisers.length) {
      content = (
        <div>
          <Grid container spacing={8}>
            {advertisers.map(i => (
              <Grid item xs={12} sm={6} key={i.uid}>
                <Paper className={classes.paper}>
                  <Typography variant="h5">
                    {`${i.name}, ${i.role} at ${i.company}`}
                  </Typography>
                  <Typography variant="body1">
                    {`email: ${i.email}, joined ${moment(i.adminDate).format(
                      'MMM Do, YYYY'
                    )}`}
                  </Typography>
                  {i.linkedin && (
                    <SocialIcon
                      className={classes.socialButton}
                      url={i.linkedin}
                      bgColor="#212121"
                      fgColor="#FFF"
                      target="_blank"
                    />
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )
    } else if (error) {
      content = <p>{error}</p>
    } else {
      content = <p>nobody here...</p>
    }

    return (
      <Section>
        <Container>
          <Title>Advertisers</Title>
          {content}
        </Container>
      </Section>
    )
  }
}

Advertisers.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  showNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

const StyledAdvertisers = withStyles(styles)(Advertisers)
const AdvertisersContainer = connect(mapStateToProps, {
  showNotifications,
})(StyledAdvertisers)

export default AdvertisersContainer
