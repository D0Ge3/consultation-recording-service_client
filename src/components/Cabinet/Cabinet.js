import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Container, Row } from 'react-bootstrap'
import { UserProfile } from './UserProfile/UserProfile'
import { ConsultationsWidget } from './ConsultationsWidget/ConsultationsWidget'

export const Cabinet = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  return isAuth ? (
    <Container className="mt-4">
      <Row>
        <UserProfile />
        <ConsultationsWidget />
      </Row>
    </Container>
  ) : (
    <Redirect to="/login" />
  )
}
