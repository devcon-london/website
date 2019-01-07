import React from 'react';
import { Text } from 'informed';
import InformedTextInput from './InformedTextInput';


class MemberFields extends React.Component {
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
      </React.Fragment>
    );
  }
}

export default MemberFields;
