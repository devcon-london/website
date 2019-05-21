import React from 'react'
import { Text } from 'informed'
import InformedTextInput from './InformedTextInput'

import Validation from './validation'

const AdvertiserFields = () => (
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
      field="email"
      id="email"
      label="Email"
      fullWidth
      validateOnChange
      validate={Validation.validEmail}
    />
    <InformedTextInput
      field="company"
      id="company"
      label="Company"
      fullWidth
      validateOnChange
      validate={Validation.validCompany}
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
      field="linkedin"
      id="linkedin"
      label="LinkedIn URL"
      fullWidth
      validateOnChange
      validate={Validation.validLinkedIn}
    />
  </React.Fragment>
)

export default AdvertiserFields
