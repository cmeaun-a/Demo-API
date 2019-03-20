import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as routePaths from 'client/utils/routePaths'
import UserContext from 'client/utils/UserContext'

const PrivateRoute = ({ ...props }) => (
  <UserContext.Consumer>
    {({ user }) =>
      user && user.id ? <Route {...props} /> : <Redirect to={routePaths.home} />
    }
  </UserContext.Consumer>
)

export default PrivateRoute
