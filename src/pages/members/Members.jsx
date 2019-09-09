import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import EventNoteIcon from '@material-ui/icons/EventNote';

import { Form } from 'informed'
import MemberFields from '../../components/form/MemberFields'
import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/reducers/ui'
import { loadMembers } from '../../state/reducers/members'

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
  margin: {
    marginLeft: theme.spacing.unit,
  },
})

class Members extends React.Component {
  state = {
    editing: false,
    sorting: 'name',
  }

  componentDidMount() {
    const { user, loadMembers } = this.props
    if (user.uid !== null) {
      loadMembers()
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
      <Typography variant="h5">{`${member.name}`}</Typography>
      <Typography variant="h6">{`${member.role}`}</Typography>
      <Typography variant="body1" gutterBottom>
        {`member since ${moment(member.adminDate).format('MMM Do, YYYY')}`}
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
        {member.github && (
          <Button
            className={classes.linkButton}
            variant="contained"
            href={member.github}
            target="_blank"
          >
            Github
          </Button>
        )}
        {member.linkedin && (
          <Button
            className={classes.linkButton}
            variant="contained"
            href={member.linkedin}
            target="_blank"
          >
            LinkedIn
          </Button>
        )}
        {member.twitter && (
          <Button
            className={classes.linkButton}
            variant="contained"
            href={member.twitter}
            target="_blank"
          >
            Twitter
          </Button>
        )}
      </Typography>
    </React.Fragment>
  )

  getSortingFn = (sortingName) => {
    const sortingParamsDict = {
      'name': { 'field': 'name', 'mult': 1 },
      '-name': { 'field': 'name', 'mult': -1 },
      'date': { 'field': 'adminDate', 'mult': 1 },
      '-date': { 'field': 'adminDate', 'mult': -1 },
    }
    const funGen = sortingParams => {
      const fun = (a, b) => {
        if (a[sortingParams.field] < b[sortingParams.field]) return -1 * sortingParams.mult
        if (a[sortingParams.field] > b[sortingParams.field]) return 1 * sortingParams.mult
        return 0
      }
      return fun
    }
    return funGen(sortingParamsDict[sortingName])
  }

  render() {
    const {
      error,
      loading,
      members,
      user,
      classes,
      showNotifications,
    } = this.props

    const { editing, sorting } = this.state

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
            {members
              .sort(this.getSortingFn(sorting))
              .map(member => {
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
        <Grid
          justify="space-between"
          container
          spacing={24}
        >
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Members.
            </Typography>
          </Grid>

          <Grid item>
            <div>
              <Fab
                size="small"
                color="secondary"
                aria-label="sort-by-alpha"
                className={classes.margin}
                onClick={() => sorting === 'name' ? this.setState({ sorting: '-name' }) : this.setState({ sorting: 'name' })}
              >
                <SortByAlphaIcon />
              </Fab>
              <Fab
                size="small"
                color="secondary"
                aria-label="sort-by-date-joined"
                className={classes.margin}
                onClick={() => sorting === 'date' ? this.setState({ sorting: '-date' }) : this.setState({ sorting: 'date' })}
              >
                <EventNoteIcon />
              </Fab>
            </div>
          </Grid>
        </Grid>
        {content}
      </div>
    )
  }
}

Members.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const StyledMembers = withStyles(styles)(Members)
const MembersContainer = connect(
  ({ user, members: { members, loading, error } }) => ({
    user,
    members,
    loading,
    error
  }),
  {
    showNotifications,
    loadMembers,
  }
)(StyledMembers)

export default MembersContainer
