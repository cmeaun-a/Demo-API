import { makeExecutableSchema } from 'graphql-tools'
import { execute } from 'graphql'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import merge from 'lodash/merge'
import * as User from './types/User'
import * as Menu from './types/Menu'
import * as Type from './types/Type'
import * as Category from './types/Category'

const baseSchema = /* GraphQL */ `
  scalar Date
  scalar DateTime

  type Query {
    ping: Boolean!
  }

  type Mutation {
    ping: Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const baseResolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    ping: () => true,
  },
  Mutation: {
    ping: () => true,
  },
}

const buildSchema = (...types) =>
  makeExecutableSchema({
    typeDefs: [baseSchema, ...types.map(({ schema }) => schema)],
    resolvers: merge(
      {},
      baseResolvers,
      ...types.map(({ resolvers }) => resolvers),
    ),
  })

const schema = buildSchema(User, Menu, Type, Category)

export const run = async (query, { variables = {}, context = {} } = {}) => {
  const { data, errors } = await execute(
    schema,
    query,
    null,
    context,
    variables,
  )
  if (errors && errors.length) {
    const error = new Error(errors)
    error.graphqlErrors = errors
    throw error
  }
  return data
}

export default schema
