import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: '/graphql',
  request: async operation => {
    const user = await localStorage.getItem('user')
    operation.setContext({ headers: { user } })
  },
})

export default client
