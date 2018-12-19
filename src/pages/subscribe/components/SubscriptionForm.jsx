import React from 'react';
import { Form, Text, TextArea } from 'informed';

class SubscriptionForm extends React.Component {
  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  submitForm = () => {
    console.log('here goes', this.formApi.getState());
  }

  render() {
    return (
      <Form id="subscription-form" getApi={this.setFormApi} onSubmit={this.submitForm}>
        <label htmlFor="name">Name</label>
        <Text field="name" id="name" />
        <label htmlFor="referrer">Introduced by (who told you about this)</label>
        <Text field="referrer" id="referrer" />
        <label htmlFor="twitter">Twitter handle</label>
        <Text field="twitter" id="twitter" />
        <label htmlFor="linkedin">LinkedIn URL</label>
        <Text field="linkedin" id="linkedin" />
        <label htmlFor="role">Role</label>
        <Text field="role" id="role" />
        <label htmlFor="role">Short Bio</label>
        <TextArea field="role" id="role" />
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export default SubscriptionForm;
