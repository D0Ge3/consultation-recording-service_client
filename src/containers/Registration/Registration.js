import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Alert } from 'react-bootstrap'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'

import s from './Registration.module.css'

export const Registration = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const registrationStatus = useSelector((state) => state.registration.registrationStatus)
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container className="mt-4">
      {registrationStatus === 'OK' && (
        <Alert variant="warning" className={s.successAlert}>
          Успешная регистрация! На вашу почту было отправлено письмо, содержащее
          ссылку для активации аккаунта!
        </Alert>
      )}
      <h4 className="h4 font-weight-normal text-center">Регистрация</h4>
      <RegistrationForm />
    </Container>
  )
}
