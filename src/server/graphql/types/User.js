import User from 'server/models/User'
import { mustBeLogged } from 'server/graphql/auth'

export const schema = /* GraphQL */ `
  type User {
    id: ID!
    email: String
    hash: String
    facebookId: String
    googleId: String
  }

  input UserInput {
    email: String
    hash: String
  }

  extend type Query {
    users: [User!]!
    user(email: String): User
    me: User
  }

  extend type Mutation {
    updateUser(userId: ID, user: UserInput): User!
  }
`

export const resolvers = {
  Query: {
    users: async () => User.query(),
    user: async (object, { email }) => User.query().findOne({ email }),

    me: async (object, params, { user }) => User.query().findOne(user),
  },

  Mutation: {
    updateUser: mustBeLogged(async (object, { userId, user }) =>
      User.query().patchAndFetchById(userId, user),
    ),
  },
}
