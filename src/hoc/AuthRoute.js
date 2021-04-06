import React from 'react'
import { Redirect, Route } from 'react-router'

export const AuthRoute = ({ isAuth, children, ...rest }) => {
  if (!isAuth) return <Redirect to="/login" />

  return (
    <Route exact {...rest}>
      {children}
    </Route>
  )
}
