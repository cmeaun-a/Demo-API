import React from 'react'
import styled from 'styled-components'
import MenuContent from 'client/components/MenuContent'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const MenuList = ({ types, categories, data, refetch }) => (
  <MenuContainer>
    {data.menus.map(menu => (
      <MenuContent
        types={types}
        categories={categories}
        menu={menu}
        key={menu.id}
        refetch={refetch}
      />
    ))}
  </MenuContainer>
)

export default MenuList
