import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { omit } from 'lodash'
import { Modal } from '@material-ui/core'
import MenuForm from 'client/components/MenuForm'

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

const UPDATE_MENU = gql`
  mutation UpdateMenu($menuId: ID!, $menu: MenuInput!) {
    updateMenu(menuId: $menuId, menu: $menu) {
      id
    }
  }
`

const EditMenuModal = ({
  types,
  categories,
  menu,
  refetch,
  toggled,
  onToggle,
}) => (
  <Modal open={toggled} onClose={onToggle}>
    <ModalContainer>
      <Mutation mutation={UPDATE_MENU}>
        {updateMenu => (
          <MenuForm
            refetch={refetch}
            types={types}
            categories={categories}
            initialValues={{
              ...menu,
              typeIds: menu.types.map(type => type.id),
            }}
            onSubmit={async values => {
              await updateMenu({
                variables: {
                  menu: omit(values, ['id', 'types', 'category', '__typename']),
                  menuId: menu.id,
                },
              })

              await refetch.refetch()
              onToggle()
            }}
          />
        )}
      </Mutation>
    </ModalContainer>
  </Modal>
)

export default EditMenuModal
