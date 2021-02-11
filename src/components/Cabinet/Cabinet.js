import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'
import { UserProfile } from './UserProfile/UserProfile'
import { ConsultationsWidget } from './ConsultationsWidget/ConsultationsWidget'

export const Cabinet = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  return isAuth ? (
    <Container className="mt-4">
      <Row>
        <Col md="12" sm="12" lg="5" xl="5">
          <UserProfile />
        </Col>
        <Col md="12" sm="12" lg="7" xl="7">
          <ConsultationsWidget />
        </Col>
      </Row>
    </Container>
  ) : (
    <Redirect to="/login" />
  )
}
