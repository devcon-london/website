import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Form, Text } from 'informed';
import InformedTextInput from '../../../components/form/InformedTextInput';
import MemberFields from '../../../components/form/MemberFields';
import AdvertiserFields from '../../../components/form/AdvertiserFields';
import { DBCollections } from '../../../constants';
import './SubscriptionForm.css';

const { db } = window;

class SubscriptionForm extends React.Component {
  state = {
    submitted: false,
    applicant: DBCollections.members,
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  submitForm = () => {
    const { user } = this.props;
    const { applicant } = this.state;
    this.formApi.setValue('uid', user.uid);
    this.formApi.setValue('date', new Date());
    // setting this value manually, informed would need workaround for radio with material-ui
    this.formApi.setValue('applicant', applicant);
    const formState = this.formApi.getState();
    if (!formState.invalid) {
      db.collection(DBCollections.submissions)
        .doc(user.uid)
        .set(formState.values)
        .then(() => {
          this.setState({ submitted: true });
        })
        .catch((error) => {
          console.log('error writing submission', error);
        });
    }
  }

  validate = value => (value ? null : 'enter value for field')

  setApplicant = e => this.setState({ applicant: e.target.value });

  render() {
    const { state } = this;
    let content = null;

    if (state.submitted) {
      content = (<p>Thank you!</p>);
    } else {
      const showForm = {
        members: <MemberFields />,
        advertisers: <AdvertiserFields />,
      };
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Applicant Type</FormLabel>
            <RadioGroup
              aria-label="Applicant"
              name="applicant"
              value={state.applicant}
              onChange={this.setApplicant}
            >
              <FormControlLabel
                value={DBCollections.members}
                control={<Radio />}
                label="Member"
              />
              <FormControlLabel
                value={DBCollections.advertisers}
                control={<Radio />}
                label="Advertiser"
              />
            </RadioGroup>
          </FormControl>
          <InformedTextInput
            field="referrer"
            id="referrer"
            label="Introduced by (who told you about this)"
            fullWidth
            validate={this.validate}
          />
          {showForm[state.applicant]}
          <Button onClick={this.submitForm}>Submit</Button>
        </Form>
      );
    }
    return content;
  }
}

SubscriptionForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SubscriptionForm;
