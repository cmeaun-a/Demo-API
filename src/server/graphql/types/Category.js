import Category from 'server/models/Category'
import { mustBeLogged } from 'server/graphql/auth'

export const schema = /* GraphQL */ `
  type Category {
    id: ID!
    name: String!
    menus: [Menu!]!
  }

  input CategoryInput {
    name: String!
  }

  extend type Query {
    categories: [Category!]!
  }

  extend type Mutation {
    updateCategory(categoryId: ID!, category: CategoryInput): Category!
    addCategory(category: CategoryInput): Category!
    deleteCategory(categoryId: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    categories: async () => Category.query(),
  },

  Mutation: {
    updateCategory: mustBeLogged(async (object, { categoryId, category }) =>
      Category.query().patchAndFetchById(categoryId, category),
    ),
    addCategory: mustBeLogged(async (object, { category }) =>
      Category.query().insertAndFetch(category),
    ),
    deleteCategory: mustBeLogged(async (object, { categoryId }) =>
      Category.query().deleteById(categoryId),
    ),
  },
  Category: {
    menus: async object => object.$relatedQuery('menus'),
  },
}
