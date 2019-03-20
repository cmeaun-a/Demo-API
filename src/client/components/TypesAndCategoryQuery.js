import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_TYPES = gql`
  query Types {
    types {
      id
      name
    }
  }
`
const GET_CATEGORY = gql`
  query Category {
    categories {
      id
      name
    }
  }
`

const TypesAndCategoryQuery = ({ children }) => (
  <Query query={GET_TYPES}>
    {({ loading: typeLoading, data: { types }, refetch: refetchTypes }) => (
      <Query query={GET_CATEGORY}>
        {({
          loading: categoryLoading,
          data: { categories },
          refetch: refetchCategories,
        }) =>
          typeLoading || categoryLoading ? (
            <span>Loading...</span>
          ) : (
            children({ categories, types, refetchTypes, refetchCategories })
          )
        }
      </Query>
    )}
  </Query>
)

export default TypesAndCategoryQuery
