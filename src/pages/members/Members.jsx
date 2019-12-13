import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, Button, Fab } from '@material-ui/core/'
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha'
import EventNoteIcon from '@material-ui/icons/EventNote'
import { Title, Section, Container } from '../../components/ui'

import { Form } from 'informed'
import MemberFields from '../../components/form/MemberFields'
import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/reducers/ui'
import { loadMembers } from '../../state/reducers/members'
import Member from '../../components/Member'

const { db } = window

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  inline: {
    display: 'inline'
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
  },
  margin: {
    marginLeft: theme.spacing(),
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
      loadMembers(user.uid)
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

  getSortingFn = sortingName => {
    const sortingParamsDict = {
      name: { field: 'name', mult: 1 },
      '-name': { field: 'name', mult: -1 },
      date: { field: 'adminDate', mult: 1 },
      '-date': { field: 'adminDate', mult: -1 },
    }
    const funGen = sortingParams => {
      const fun = (a, b) => sortingParams.mult * a[sortingParams.field].localeCompare(b[sortingParams.field])
      return fun
    }
    return funGen(sortingParamsDict[sortingName])
  }

  onEdit = () => {
    this.setState({editing: true})
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

    if (loading || user.loading) {
      content = <p>loading...</p>
    } else if (user.uid === null) {
      // user not logged in
      showNotifications(Errors.loginFirst)
      content = <Redirect to="/" />
    } else if (error !== null) {
      content = <p>{error}</p>
    } else if (members.length) {
      content = (
        <div className={classes.root}>
          <Grid container spacing={6}>
            {members.sort(this.getSortingFn(sorting)).map(member => {
              let memberContent = null
              if (editing === true && member.uid === user.uid) {
                memberContent = (
                  <Grid item xs={12} sm={12} md={4} key={member.uid}>
                    <Paper className={classes.paper}>{this.getUserForm(member)}</Paper>
                  </Grid>
                )
              } else {
                memberContent = <Member key={member.uid} onEdit={this.onEdit} member={member} editable={member.uid === user.uid} />
              }

              return memberContent
            })}
          </Grid>
        </div>
      )
    } else {
      content = <p>these are not the droids you are looking for!</p>
    }

    return (
      <Section>
        <Container>
        <Grid justify="space-between" container spacing={6}>
          <Grid item>
            <Title>
              Members{' '}
              <Typography className={classes.inline} component="span" variant="h6">
                ({members.length})
              </Typography>
            </Title>
          </Grid>

          <Grid item>
            <div>
              <Fab
                size="small"
                color="secondary"
                aria-label="sort-by-alpha"
                className={classes.margin}
                onClick={() =>
                  sorting === 'name'
                    ? this.setState({ sorting: '-name' })
                    : this.setState({ sorting: 'name' })
                }
              >
                <SortByAlphaIcon />
              </Fab>
              <Fab
                size="small"
                color="secondary"
                aria-label="sort-by-date-joined"
                className={classes.margin}
                onClick={() =>
                  sorting === 'date'
                    ? this.setState({ sorting: '-date' })
                    : this.setState({ sorting: 'date' })
                }
              >
                <EventNoteIcon />
              </Fab>
            </div>
          </Grid>
        </Grid>
        {content}
        </Container>
      </Section>
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
    error,
  }),
  {
    showNotifications,
    loadMembers,
  }
)(StyledMembers)

export default MembersContainer
