import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Col, Row, Alert } from 'react-bootstrap'
import { RegistrationForm } from './RegistrationForm'

import s from './Registration.module.css'

export const Registration = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const registrationStatus = useSelector((state) => state.registration.registrationStatus)
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container className="mt-4">
      {registrationStatus === 'OK' && (
        <Alert variant="success" className={s.successAlert}>
          Вы успешно зарегистрированы!
        </Alert>
      )}
      <h4 className="h4 font-weight-normal text-center">Регистрация</h4>
      <RegistrationForm />
    </Container>
  )
}
