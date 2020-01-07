import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { Form, Text } from 'informed'
import Validation from './validation'
import InformedTextInput from './InformedTextInput'
import MemberFields from './MemberFields'
import AdvertiserFields from './AdvertiserFields'
import { DBCollections } from '../../constants'
import './SubscriptionForm.css'

const { db } = window

class SubscriptionForm extends React.Component {
  state = {
    submitted: false,
    error: null,
    applicant: DBCollections.members,
  }

  setFormApi = formApi => {
    this.formApi = formApi
  }

  submitForm = () => {
    const formState = this.formApi.getState()
    // require at least these fields common to both forms
    const touched = ['referrer', 'name', 'role', 'email', 'linkedin'].reduce(
      (acc, cur) => acc && formState.touched[cur],
      true
    )
    if (!formState.invalid && !formState.pristine && touched) {
      const { user } = this.props
      const { applicant } = this.state
      // add values for hidden fields
      this.formApi.setValue('uid', user.uid)
      this.formApi.setValue('date', new Date())
      // setting this value manually, informed would need workaround for radio with material-ui
      this.formApi.setValue('applicant', applicant)
      db.collection(DBCollections.submissions)
        .doc(user.uid)
        .set(formState.values)
        .then(() => {
          this.setState({ submitted: true })
        })
        .catch(error => {
          // console.log('error writing submission', error)
          this.setState({ error: error })
        })
    }
  }

  setApplicant = e => this.setState({ applicant: e.target.value })

  render() {
    const { state } = this
    let content = null

    if (state.submitted) {
      content = <p>Thank you!</p>
    } else {
      const showForm = {
        members: <MemberFields />,
        advertisers: <AdvertiserFields />,
      }
      content = (
        <Form
          className="SubscriptionForm"
          id="subscription-form"
          getApi={this.setFormApi}
          onSubmit={this.submitForm}
        >
          <Text field="date" id="date" hidden />
          {/* setting this value manually, informed would need workaround for radio with material-ui */}
          <Text field="applicant" id="applicant" hidden />
          <FormControl margin="normal" fullWidth>
            <FormLabel component="legend">Applicant Type</FormLabel>
            <RadioGroup
              row
              aria-label="Applicant"
              name="applicant"
              value={state.applicant}
              onChange={this.setApplicant}
            >
              <FormControlLabel
                value={DBCollections.members}
                control={<Radio />}
                label="Member"
                labelPlacement="end"
              />
              {/* (select this if you are a developer who wants to join a community of likeminded people and participate in conversations and events organised with your fellows) */}
              <FormControlLabel
                value={DBCollections.advertisers}
                control={<Radio color="secondary" />}
                label="Advertiser"
                labelPlacement="end"
              />
              {/* (select this if you are planning to support our community of developers with sponsorships, infrastructure, job opportunities and other kind of economical commitments) */}
            </RadioGroup>
          </FormControl>
          <InformedTextInput
            field="referrer"
            id="referrer"
            label="Introduced by (who told you about this)"
            fullWidth
            validateOnChange
            validate={Validation.validName}
          />
          {showForm[state.applicant]}
          {state.error &&
            <FormLabel component="legend" color="secondary">
              There was an error while submitting the form: {state.error}
            </FormLabel>}
          <Button onClick={this.submitForm} variant="contained" color="primary" disabled={state.applicant === 'advertisers'}>Submit</Button>
        </Form>
      )
    }
    return content
  }
}

SubscriptionForm.propTypes = {
  user: PropTypes.object.isRequired,
}

export default SubscriptionForm
