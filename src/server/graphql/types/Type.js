import Type from 'server/models/Type'
import { mustBeLogged } from 'server/graphql/auth'

export const schema = /* GraphQL */ `
  type Type {
    id: ID!
    name: String!
    menus: [Menu!]!
  }

  input TypeInput {
    name: String!
  }

  extend type Query {
    types: [Type!]!
  }

  extend type Mutation {
    updateType(typeId: ID!, type: TypeInput): Type!
    addType(type: TypeInput): Type!
    deleteType(typeId: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    types: async () => Type.query(),
  },

  Mutation: {
    updateType: mustBeLogged(async (object, { typeId, type }) =>
      Type.query().patchAndFetchById(typeId, type),
    ),
    addType: mustBeLogged(async (object, { type }) =>
      Type.query().insertAndFetch(type),
    ),
    deleteType: mustBeLogged(async (object, { typeId }) =>
      Type.query().deleteById(typeId),
    ),
  },
  Type: {
    menus: async object => object.$relatedQuery('menus'),
  },
}
