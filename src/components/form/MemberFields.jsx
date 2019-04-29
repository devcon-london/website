import React from 'react';
import { Text } from 'informed';
import InformedTextInput from './InformedTextInput';

import Validation from './validation';


const MemberFields = () => (
  <React.Fragment>
    <Text field="uid" id="uid" hidden />
    <InformedTextInput
      field="name"
      id="name"
      label="Name"
      fullWidth
      validateOnChange
      validate={Validation.validName}
    />
    <InformedTextInput
      field="github"
      id="github"
      label="Github URL"
      fullWidth
      validateOnChange
      validate={Validation.validGithub}
    />
    <InformedTextInput
      field="twitter"
      id="twitter"
      label="Twitter URL"
      fullWidth
      validateOnChange
      validate={Validation.validTwitter}
    />
    <InformedTextInput
      field="linkedin"
      id="linkedin"
      label="LinkedIn URL"
      fullWidth
      validateOnChange
      validate={Validation.validLinkedIn}
    />
    <InformedTextInput
      field="role"
      id="role"
      label="Role"
      fullWidth
      validateOnChange
      validate={Validation.validRole}
    />
    <InformedTextInput
      field="bio"
      id="bio"
      label="Short Bio"
      fullWidth
      multiline
      rows="4"
      validateOnChange
      validate={Validation.validBio}
    />
  </React.Fragment>
);

export default MemberFields;
