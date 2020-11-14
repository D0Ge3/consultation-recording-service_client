import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container } from 'react-bootstrap'

export const Registration = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container className="mt-4 text-center">
      <p className="h4 font-weight-normal">Регистрация</p>
    </Container>
  )
}
