import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { Title, Section, Container } from '../../components/ui'
import Member from '../../components/submission/Member'
import Advertiser from '../../components/submission/Advertiser'
import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/reducers/ui'

const { db } = window

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  linkButton: {
    marginRight: '5px',
  },
  paper: {
    padding: theme.spacing(2),
  },
})

class Submissions extends React.Component {
  state = {
    submissions: [],
    error: null,
  }

  componentDidMount() {
    const { user } = this.props
    if (user.uid !== null) {
      this.submissionsUnsubscribe = db
        .collection(DBCollections.submissions)
        .onSnapshot(
          snapshot => {
            const submissions = []
            snapshot.forEach(doc => {
              submissions.push(doc.data())
            })
            this.setState({ submissions, error: null })
          },
          error => {
            this.setState({
              submissions: [],
              error: Errors.sectionPermission,
            })
          }
        )
    }
  }

  componentWillUnmount() {
    if (this.submissionsUnsubscribe) {
      this.submissionsUnsubscribe()
    }
  }

  approveSubmission = e => {
    this.handleSubmission(e.target.dataset.uid, true)
  }

  rejectSubmission = e => {
    this.handleSubmission(e.target.dataset.uid, false)
  }

  getClickHandler = (uid, approval) => {
    const f = () => this.handleSubmission(uid, approval)
    return f
  }

  handleSubmission = (uid, approval) => {
    // console.log('handle', uid, 'approve', approval);
    const { user } = this.props
    db.collection(DBCollections.submissions)
      .doc(uid)
      .get()
      .then(doc => {
        // inject current user id and date so we know who approved/rejected
        const data = Object.assign(
          {
            adminUid: user.uid,
            adminDate: new Date().toISOString(),
          },
          doc.data()
        )
        let collection = DBCollections.rejects
        if (approval) {
          // determine the right collection depending on applicant value
          // can be either members or advertisers, set by SubcscriptionForm
          collection = DBCollections[data.applicant]
        }
        db.collection(collection)
          .doc(uid)
          .set(data)
          .then(() => {
            db.collection(DBCollections.submissions)
              .doc(uid)
              .delete()
              .then(() => {
                // console.log('it is always sunny in California');
                this.setState({ error: null })
              })
              .catch(error => {
                // console.log('error deleting submission', error)
                this.setState({ error: 'error deleting submission' })
              })
          })
          .catch(error => {
            // console.log('error setting submission', collection, error)
            this.setState({ error: 'error setting submission' })
          })
      })
      .catch(error => {
        // console.log('error retrieving submission', uid, error)
        this.setState({ error: 'error retrieving submission' })
      })
  }

  getFields = submission => {
    const showFields = {
      members: <Member submission={submission} />,
      advertisers: <Advertiser submission={submission} />,
    }
    return showFields[submission.applicant]
  }

  render() {
    const { user, classes, showNotifications } = this.props
    const { submissions, error } = this.state
    let content = null

    if (user.uid === null) {
      // user not logged in
      showNotifications(Errors.loginFirst)
      content = <Redirect to="/" />
    } else if (submissions.length) {
      content = (
        <div className={classes.root}>
          <Grid container spacing={8}>
            {submissions.map(i => (
              <Grid item xs={12} key={i.uid}>
                <Paper className={classes.paper}>
                  {this.getFields(i)}
                  {/* material-ui Button doesn't like data-* attributes, hence the getClickHandler */}
                  {[
                    { label: 'Accept', approval: true },
                    { label: 'Reject', approval: false },
                  ].map(v => (
                    <Button
                      className={classes.linkButton}
                      variant="contained"
                      color={v.approval ? 'primary' : 'secondary'}
                      key={v.label}
                      data-uid={i.uid}
                      onClick={this.getClickHandler(i.uid, v.approval)}
                    >
                      {v.label}
                    </Button>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )
    } else if (error) {
      content = (
        <Typography variant="body1" color="secondary">
          {error}
        </Typography>
      )
    } else {
      content = <Typography variant="body1">No pending submissions!</Typography>
    }

    return (
      <Section>
        <Container>
          <Title>Submissions</Title>
          {content}
        </Container>
      </Section>
    )
  }
}

Submissions.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  showNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

const StyledSubmissions = withStyles(styles)(Submissions)
const SubmissionsContainer = connect(mapStateToProps, {
  showNotifications,
})(StyledSubmissions)

export default SubmissionsContainer
