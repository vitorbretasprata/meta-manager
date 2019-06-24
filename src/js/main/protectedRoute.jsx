import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ simpleAuth }) => (
      <Route
        render={props =>
          simpleAuth() ? <Component {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute;