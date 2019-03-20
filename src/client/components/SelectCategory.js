import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  OutlinedInput,
} from '@material-ui/core'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import EditCategoryModal from 'client/components/EditCategoryModal'

const Form = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 120;
  margin-top: 1rem;
`

const ADD_CATEGORY = gql`
  mutation AddCategory($category: CategoryInput!) {
    addCategory(category: $category) {
      name
    }
  }
`

const SelectCategory = ({ label, data, refetch, ...props }) => {
  const [toggle, setToggle] = useState(false)
  const addCategory = useMutation(ADD_CATEGORY)

  return (
    <Field {...props}>
      {({ input }) => (
        <FormControl>
          <Form>
            <InputLabel variant="outlined">{label}</InputLabel>
            <Select
              style={{ width: '17rem' }}
              inputProps={input}
              variant="outlined"
              input={<OutlinedInput labelWidth={10} id="outlined" />}
            >
              {data.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
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
            <EditCategoryModal
              refetch={refetch}
              data={data}
              name="name"
              toggled={toggle}
              onToggle={() => setToggle(!toggle)}
              onSubmit={async values => {
                await addCategory({
                  variables: {
                    category: values,
                  },
                })
                await refetch.refetchCategories()
              }}
            />
          </Form>
        </FormControl>
      )}
    </Field>
  )
}

export default SelectCategory
