import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container } from 'react-bootstrap'
import { SettingsForm } from '../../components/SettingsForm/SettingsForm'
import { PasswordForm } from '../../components/SettingsForm/PasswordForm'

export const Settings = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  return isAuth ? (
    <Container className="mt-4">
      <h5 className="text-center">Настройки</h5>
      <div>
        <SettingsForm />
      </div>
      <div className="mt-4">
        <PasswordForm />
      </div>
    </Container>
  ) : (
    <Redirect to="/" />
  )
}
