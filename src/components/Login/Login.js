import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { LoginForm } from './LoginForm'

export const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container className="mt-4 text-center">
      <p className="h4 font-weight-normal">Авторизация</p>
      <LoginForm />
    </Container>
  )
}
