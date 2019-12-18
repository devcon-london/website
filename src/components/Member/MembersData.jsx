import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import { Grid, Paper, Button } from '@material-ui/core/'
import { Form } from 'informed'

import { DBCollections, Errors } from '../../constants'
import MemberFields from '../form/MemberFields'
import { showNotifications } from '../../state/reducers/ui'

const { db } = window

const styles = theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
  },
})

class MembersData extends React.Component {
  setFormApi = formApi => {
    this.formApi = formApi
  }

  submitForm = () => {
    const formState = this.formApi.getState()
    const { onAction, showNotifications } = this.props

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
              // it's always sunny in California
              onAction()
            })
            .catch(error => {
              // error: 'Error storing data',
              showNotifications(Errors.errorSaving)
              onAction()
            })
        })
        .catch(error => {
          // error: 'Error fetching your personal data',
          showNotifications(Errors.errorLoading)
          onAction()
        })
    }
  }

  render = () => {
    const { member, classes, onAction } = this.props

    return (
      <Grid item xs={12} sm={12} md={4} key={member.uid}>
        <Paper className={classes.paper}>
          <Form
            className="SubscriptionForm"
            id="subscription-form"
            getApi={this.setFormApi}
            initialValues={member}
            key={member.uid}
          >
            <MemberFields />
            <Button onClick={this.submitForm}>Submit</Button>
            <Button onClick={onAction}>Cancel</Button>
          </Form>
        </Paper>
      </Grid>
    )
  }
}

MembersData.propTypes = {
  member: PropTypes.object.isRequired,
  showNotifications: PropTypes.func.isRequired,
}

const StyledMembersData = withStyles(styles)(MembersData)
const StyledMembersDataContainer = connect(null, {
  showNotifications,
})(StyledMembersData)

export default StyledMembersDataContainer
