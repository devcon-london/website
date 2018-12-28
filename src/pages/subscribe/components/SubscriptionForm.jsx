import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text, TextArea } from 'informed';
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
    const { props } = this;
    const { user } = props;
    this.formApi.setValue('uid', user.uid);
    this.formApi.setValue('date', new Date());
    const formState = this.formApi.getState();
    if (!formState.invalid) {
      db.collection(DBCollections.submissions).doc(user.uid)
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
          <label htmlFor="name">Name</label>
          <Text field="name" id="name" validate={this.validate} />
          <label htmlFor="referrer">Introduced by (who told you about this)</label>
          <Text field="referrer" id="referrer" validate={this.validate} />
          <label htmlFor="github">Github URL</label>
          <Text field="github" id="github" validate={this.validate} />
          <label htmlFor="twitter">Twitter URL</label>
          <Text field="twitter" id="twitter" validate={this.validate} />
          <label htmlFor="linkedin">LinkedIn URL</label>
          <Text field="linkedin" id="linkedin" validate={this.validate} />
          <label htmlFor="role">Role</label>
          <Text field="role" id="role" validate={this.validate} />
          <label htmlFor="bio">Short Bio</label>
          <TextArea field="bio" id="bio" validate={this.validate} />
          <button type="submit">Submit</button>
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
