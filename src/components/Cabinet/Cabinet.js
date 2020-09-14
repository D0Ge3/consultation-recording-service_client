import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Container, Row } from 'react-bootstrap'
import { UserProfile } from './UserProfile/UserProfile'
import { WrotesWidget } from './WrotesWidget/WrotesWidget'

export const Cabinet = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  return isAuth ? (
    <Container className="mt-4">
      <Row>
        <UserProfile />
        <WrotesWidget />
      </Row>
    </Container>
  ) : (
    <Redirect to="/login" />
  )
}
