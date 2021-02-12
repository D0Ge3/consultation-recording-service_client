import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { UserProfile } from '../../components/UserProfile/UserProfile'
import { ConsultationsWidget } from '../../components/ConsultationsWidget/ConsultationsWidget'

export const Cabinet = () => {
  return (
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
  )
}
