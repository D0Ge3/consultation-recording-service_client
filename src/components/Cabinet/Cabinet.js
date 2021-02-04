import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'
import { UserProfile } from './UserProfile/UserProfile'
import { ConsultationsWidget } from './ConsultationsWidget/ConsultationsWidget'
import { Loader } from '../../ui/Loader/Loader'

export const Cabinet = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const isLoading = useSelector((state) => state.app.isLoading)
  // if (isLoading) {
  //   return (
  //     <Container className="mt-4" style={{ width: '180px' }}>
  //       <Loader />
  //     </Container>
  //   )
  // }
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
