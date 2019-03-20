import React from 'react'
import { TextField as BaseTextField } from '@material-ui/core'
import { Field } from 'react-final-form'

const TextField = ({ label, ...props }) => (
  <Field {...props}>
    {({ input }) => (
      <BaseTextField
        InputProps={input}
        label={label}
        margin="dense"
        variant="outlined"
        multiline
      />
    )}
  </Field>
)

export default TextField
