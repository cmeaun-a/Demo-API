import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import * as routes from 'client/routes'
import * as routePaths from 'client/utils/routePaths'
import PrivateRoute from 'client/utils/PrivateRoute'
import UserContext from 'client/utils/UserContext'
import client from 'client/utils/graphql'

class App extends React.Component {
  state = {
    loading: true,
  }

  isAuthenticated = async () => {
    const { data: user } = await axios.get('/auth/isAuthenticated', {
      withCredentials: true,
    })

    localStorage.setItem('user', JSON.stringify(user))
    this.setState({ loading: false, user })
  }

  componentDidMount() {
    this.isAuthenticated()
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>
    }
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <UserContext.Provider
            value={{
              user: this.state.user,
              setUser: () => this.isAuthenticated(),
            }}
          >
            <BrowserRouter>
              <>
                <Switch>
                  <Route
                    exact
                    path={routePaths.home()}
                    component={routes.Home}
                  />
                  <PrivateRoute
                    path={routePaths.restaurant(':restaurantName')}
                    component={routes.Restaurant}
                  />
                </Switch>
              </>
            </BrowserRouter>
          </UserContext.Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    )
  }
}

export default App
