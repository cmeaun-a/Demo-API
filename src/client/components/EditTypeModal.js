import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Form } from 'react-final-form'
import {
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  FormControl,
} from '@material-ui/core'
import styled from 'styled-components'
import TextField from 'client/components/TextField'

const ModalContainer = styled.div`
  border-radius: 8px;
  outline: none;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
`

const AddForm = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 120;
  margin-top: 1rem;
`

const DELETE_TYPE = gql`
  mutation DeleteType($typeId: ID!) {
    deleteType(typeId: $typeId)
  }
`
const EditTypeModal = ({
  refetch,
  data,
  onSubmit,
  toggled,
  onToggle,
  name,
}) => {
  const deleteType = useMutation(DELETE_TYPE)

  return (
    <Modal open={toggled} onClose={onToggle}>
      <ModalContainer>
        <List>
          {data.map(type => (
            <ListItem key={type.id}>
              <ListItemText>{type.name}</ListItemText>
              <Button
                color="primary"
                type="button"
                onClick={async e => {
                  e.stopPropagation()
                  await deleteType({
                    variables: { typeId: type.id },
                  })
                  await refetch.refetchTypes()
                }}
              >
                delete
              </Button>
            </ListItem>
          ))}
        </List>
        <Form
          initialValues={{}}
          onSubmit={async (values, { reset }) => {
            await onSubmit(values)
            reset()
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <AddForm>
                  <TextField name={name} label={name} />
                  <Button type="submit" color="primary">
                    ADD
                  </Button>
                </AddForm>
                <Button onClick={onToggle} color="primary">
                  EDIT
                </Button>
              </FormControl>
            </form>
          )}
        </Form>
      </ModalContainer>
    </Modal>
  )
}

export default EditTypeModal
