import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import MenuForm from 'client/components/MenuForm'
import MenuList from 'client/components/MenuList'
import styled from 'styled-components'
import NavigatorBar from 'client/components/NavigatorBar'
import TypesAndCategoryQuery from 'client/components/TypesAndCategoryQuery'

const ADD_MENU = gql`
  mutation AddMenu($menu: MenuInput!, $restaurantName: String!) {
    addMenu(menu: $menu, restaurantName: $restaurantName) {
      id
    }
  }
`

const GET_MENUS = gql`
  query Menu($restaurantName: String!, $filter: MenuFilter) {
    menus(restaurantName: $restaurantName, filter: $filter) {
      id
      englishName
      laoName
      price
      englishDetail
      laoDetail
      cloudinaryId
      types {
        id
        name
      }
      category {
        id
        name
      }
      new
      promo
    }
  }
`

const DsdContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`

const Input = styled.input`
  width: 15rem;
  margin-left: 25.5rem;
`
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
`
const Div = styled.div`
  margin-top: 6rem;
`

const Restaurant = props => {
  const { restaurantName } = props.match.params
  const [filter, setFilter] = useState('')
  const addMenu = useMutation(ADD_MENU)

  return (
    <Div>
      <NavigatorBar />
      <Input
        placeholder="English name"
        value={filter}
        onChange={event => {
          const { value } = event.target
          setFilter(value)
        }}
      />
      <DsdContent>
        <TypesAndCategoryQuery>
          {({ types, categories, refetchTypes, refetchCategories }) => (
            <Query
              query={GET_MENUS}
              variables={{
                restaurantName,
                filter: { englishName: filter },
              }}
            >
              {({ loading, data, refetch }) => (
                <>
                  <MenuForm
                    refetch={{ refetchTypes, refetchCategories }}
                    types={types}
                    categories={categories}
                    initialValues={{ typeIds: [] }}
                    onSubmit={async values => {
                      await addMenu({
                        variables: {
                          menu: values,
                          restaurantName,
                        },
                      })
                      await refetch()
                    }}
                  />
                  {loading ? (
                    <p>loading...</p>
                  ) : (
                    <MenuContainer>
                      <MenuList
                        types={types}
                        categories={categories}
                        data={data}
                        refetch={{ refetch, refetchTypes, refetchCategories }}
                      />
                    </MenuContainer>
                  )}
                </>
              )}
            </Query>
          )}
        </TypesAndCategoryQuery>
      </DsdContent>
    </Div>
  )
}

export default Restaurant
