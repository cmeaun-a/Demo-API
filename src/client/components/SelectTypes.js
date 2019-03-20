import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormControl,
  Button,
} from '@material-ui/core'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import EditTypeModal from './EditTypeModal'

const Form = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 120;
  margin-top: 1rem;
`

const ADD_TYPE = gql`
  mutation AddType($type: TypeInput!) {
    addType(type: $type) {
      name
    }
  }
`

const SelectTypes = ({ label, data, refetch, ...props }) => {
  const [toggle, setToggle] = useState(false)
  const addType = useMutation(ADD_TYPE)

  return (
    <Field {...props}>
      {({ input }) => (
        <>
          <FormControl>
            <Form>
              <InputLabel variant="outlined">{label}</InputLabel>
              <Select
                style={{ width: '17rem' }}
                multiple
                inputProps={input}
                input={
                  <OutlinedInput
                    labelWidth={10}
                    id="select-multiple-checkbox"
                  />
                }
                renderValue={selected =>
                  selected.map(x => data.find(e => e.id === x).name).join(', ')
                }
              >
                {data.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    <Checkbox checked={input.value.indexOf(option.id) > -1} />
                    <ListItemText primary={option.name} />
                  </MenuItem>
                ))}
              </Select>
              <Button
                color="primary"
                type="button"
                onClick={() => setToggle(!toggle)}
              >
                Edit
              </Button>
              <EditTypeModal
                refetch={refetch}
                data={data}
                name="name"
                toggled={toggle}
                onToggle={() => setToggle(!toggle)}
                onSubmit={async values => {
                  await addType({
                    variables: {
                      type: values,
                    },
                  })
                  await refetch.refetchTypes()
                }}
              />
            </Form>
          </FormControl>
        </>
      )}
    </Field>
  )
}

export default SelectTypes
