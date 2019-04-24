import React from 'react';
import { Text } from 'informed';
import InformedTextInput from './InformedTextInput';


class AdvertiserFields extends React.Component {
  validate = value => (value ? null : 'enter value for field')

  render() {
    return (
      <React.Fragment>
        <Text field="uid" id="uid" hidden />
        <InformedTextInput
          field="name"
          id="name"
          label="Name"
          fullWidth
          validate={this.validate}
        />
        <InformedTextInput
          field="email"
          id="email"
          label="Email"
          fullWidth
          validate={this.validate}
        />
        <InformedTextInput
          field="company"
          id="company"
          label="Company"
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
          field="linkedin"
          id="linkedin"
          label="LinkedIn URL"
          fullWidth
          validate={this.validate}
        />
      </React.Fragment>
    );
  }
}

export default AdvertiserFields;
