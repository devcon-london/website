import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Form, Text } from 'informed';
import InformedTextInput from '../../../components/form/InformedTextInput';
import { DBCollections } from '../../../constants';
import './SubscriptionForm.css';

const { db } = window;

class SubscriptionForm extends React.Component {
  state = {
    submitted: false,
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  submitForm = () => {
    const { user } = this.props;
    this.formApi.setValue('uid', user.uid);
    this.formApi.setValue('date', new Date());
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

  render() {
    const { state } = this;
    let content = null;

    if (state.submitted) {
      content = (<p>Thank you!</p>);
    } else {
      content = (
        <Form
          className="SubscriptionForm"
          id="subscription-form"
          getApi={this.setFormApi}
          onSubmit={this.submitForm}
        >
          <Text field="uid" id="uid" hidden />
          <Text field="date" id="date" hidden />
          <InformedTextInput
            field="name"
            id="name"
            label="Name"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="referrer"
            id="referrer"
            label="Introduced by (who told you about this)"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="github"
            id="github"
            label="Github URL"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="twitter"
            id="twitter"
            label="Twitter URL"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="linkedin"
            id="linkedin"
            label="LinkedIn URL"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="role"
            id="role"
            label="Role"
            fullWidth
            validate={this.validate}
          />
          <InformedTextInput
            field="bio"
            id="bio"
            label="Short Bio"
            fullWidth
            multiline
            rows="4"
            validate={this.validate}
          />
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
