import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Form } from 'informed'
import MemberFields from '../../components/form/MemberFields'
import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/actions/notifications'

const { db } = window

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  linkButton: {
    marginRight: '5px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
})

/**
 * this might be helpful for debug
const fakeMembers = () => (
  [1, 2, 3, 4, 5, 6, 7, 8].map(v => ({
    uid: v,
    name: `Zungo ${v}`,
    role: 'dev',
    bio: 'crisps websites',
    adminDate: (new Date()).toISOString(),
    github: 'http://www.google.com/',
    linkedin: 'http://www.google.com/',
    twitter: 'http://www.google.com/',
  }))
);
 */

class Members extends React.Component {
  state = {
    members: [],
    loading: true,
    editing: false,
    error: null,
  }

  componentDidMount() {
    const { user } = this.props
    if (user.uid !== null) {
      this.membersUnsubscribe = db.collection(DBCollections.members).onSnapshot(
        snapshot => {
          const members = []
          snapshot.forEach(doc => {
            members.push(doc.data())
          })
          this.setState({
            members,
            loading: false,
            error: null,
          })
        },
        error => {
          this.setState({
            members: [],
            loading: false,
            error: Errors.notAMember,
          })
        }
      )
    }
  }

  componentWillUnmount() {
    if (this.membersUnsubscribe) {
      this.membersUnsubscribe()
    }
  }

  setFormApi = formApi => {
    this.formApi = formApi
  }

  submitForm = () => {
    const formState = this.formApi.getState()
    if (!formState.invalid) {
      db.collection(DBCollections.members)
        .doc(formState.values.uid)
        .get()
        .then(doc => {
          const updatedData = Object.assign({}, doc.data(), formState.values)
          db.collection(DBCollections.members)
            .doc(updatedData.uid)
            .set(updatedData)
            .then(() => {
              this.setState({
                error: null,
                editing: false,
              })
            })
            .catch(error => {
              this.setState({
                error: 'Error storing data',
                editing: false,
              })
            })
        })
        .catch(error => {
          this.setState({
            error: 'Error fetching your personal data',
            editing: false,
          })
        })
    }
  }

  getUserForm = member => (
    <Form
      className="SubscriptionForm"
      id="subscription-form"
      getApi={this.setFormApi}
      initialValues={member}
      key={member.uid}
    >
      <MemberFields />
      <Button onClick={this.submitForm}>Submit</Button>
      <Button
        onClick={() => {
          this.setState({ editing: false })
        }}
      >
        Cancel
      </Button>
    </Form>
  )

  getUserCard = (member, editable, classes) => (
    <React.Fragment>
      <Typography variant="h5">{`${member.name}, ${member.role}`}</Typography>
      <Typography variant="body1" gutterBottom>
        {`member since ${member.adminDate}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {member.bio}
      </Typography>
      <Typography variant="body1">
        {editable ? (
          <Button
            className={classes.linkButton}
            variant="contained"
            color="primary"
            onClick={() => this.setState({ editing: true })}
          >
            edit
          </Button>
        ) : (
          ''
        )}
        <Button
          className={classes.linkButton}
          variant="contained"
          href={member.github}
        >
          Github
        </Button>
        <Button
          className={classes.linkButton}
          variant="contained"
          href={member.linkedin}
        >
          LinkedIn
        </Button>
        <Button
          className={classes.linkButton}
          variant="contained"
          href={member.twitter}
        >
          Twitter
        </Button>
      </Typography>
    </React.Fragment>
  )

  render() {
    const { user, classes, showNotifications } = this.props
    const { members, loading, editing, error } = this.state

    let content = null

    if (user.uid === null) {
      // user not logged in
      showNotifications(Errors.loginFirst)
      content = <Redirect to="/" />
    } else if (loading) {
      content = <p>loading...</p>
    } else if (error !== null) {
      content = <p>{error}</p>
    } else if (members.length) {
      content = (
        <div className={classes.root}>
          <Grid container spacing={24}>
            {members.map(member => {
              let memberContent = null
              if (editing === true && member.uid === user.uid) {
                memberContent = this.getUserForm(member)
              } else {
                const editable = member.uid === user.uid
                memberContent = this.getUserCard(member, editable, classes)
              }

              return (
                <Grid item xs={12} sm={6} key={member.uid}>
                  <Paper className={classes.paper}>{memberContent}</Paper>
                </Grid>
              )
            })}
          </Grid>
        </div>
      )
    } else {
      content = <p>these are not the droids you are looking for!</p>
    }

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Members.
        </Typography>
        {content}
      </div>
    )
  }
}

Members.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

const StyledMembers = withStyles(styles)(Members)
const MembersContainer = connect(
  mapStateToProps,
  {
    showNotifications,
  }
)(StyledMembers)

export default MembersContainer
