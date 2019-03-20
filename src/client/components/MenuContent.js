import React, { useState } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Card as BaseCard,
  CardActionArea,
  CardContent,
  Button,
} from '@material-ui/core'
import EditMenuModal from 'client/components/EditMenuModal'

const DELETE_MENU = gql`
  mutation DeleteMenu($menuId: ID!) {
    deleteMenu(menuId: $menuId)
  }
`
const Card = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 20px;
  max-height: 400px;
`
const Text = styled.p`
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden !important;
  width: 12rem;
  text-overflow: ellipsis;
`
const Image = styled.img`
  height: 140px;
  width: 200px;
  object-fit: fill;
`

const MenuContent = ({ types, categories, menu, refetch }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <Card>
      <CardActionArea onClick={() => setToggle(!toggle)}>
        <Image src={menu.cloudinaryId} alt={menu.englishName} />
        <CardContent>
          <Text>{menu.englishName}</Text>
          <Text>{menu.laoName}</Text>
          <Text>{menu.price} Kip</Text>
          <Text>{`🇬🇧 detail: ${
            menu.englishDetail ? menu.englishDetail : ''
          }`}</Text>
          <Text>{`🇱🇦 detail: ${menu.laoDetail ? menu.laoDetail : ''}`}</Text>
          <Text>Types: {menu.types.map(type => type.name).join(', ')}</Text>
          <Text>Category: {menu.category ? menu.category.name : ''}</Text>
          <Text>New: {menu.new ? 'Yes' : 'No'}</Text>
          <Text>Promo: {menu.promo ? 'Yes' : 'No'}</Text>
        </CardContent>
      </CardActionArea>
      <Mutation mutation={DELETE_MENU}>
        {deleteMenu => (
          <Button
            color="primary"
            type="button"
            onClick={async e => {
              e.stopPropagation()
              await deleteMenu({
                variables: { menuId: menu.id },
              })
              await refetch.refetch()
            }}
          >
            delete
          </Button>
        )}
      </Mutation>
      <EditMenuModal
        types={types}
        categories={categories}
        menu={menu}
        refetch={refetch}
        toggled={toggle}
        onToggle={() => setToggle(!toggle)}
      />
    </Card>
  )
}
export default MenuContent
