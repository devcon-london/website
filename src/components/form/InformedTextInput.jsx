import React from 'react'
import TextField from '@material-ui/core/TextField'
import { asField } from 'informed'

/**
 * have a look at https://github.com/joepuzzo/informed/issues/114
 */

class InformedTextInput extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this
    if (nextProps.fieldState === props.fieldState && nextState === this.state) {
      return false
    }
    return true
  }

  handleChange = event => {
    const { props } = this
    props.fieldApi.setValue(event.target.value)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  handleBlur = event => {
    const { props } = this
    props.fieldApi.setTouched(true)
    if (props.onBlur) {
      props.onBlur(event)
    }
  }

  render() {
    const {
      field,
      fieldState,
      fieldApi,
      onChange,
      onBlur,
      initialValue,
      forwardedRef,
      className,
      setFocus,
      children,
      InputProps,
      validate,
      ...rest
    } = this.props

    const { value, error } = fieldState

    return (
      <TextField
        {...rest}
        value={!value && value !== 0 ? '' : value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={!!error}
        helperText={error}
      />
    )
  }
}

export default asField(InformedTextInput)
