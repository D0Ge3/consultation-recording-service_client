import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { changePassword } from '../../redux/actions/profileActions'

import { Form, Button } from 'react-bootstrap'

import s from './Settings.module.css'
import { SettingsStatusAlert } from './SettingStatusAlert'

const PasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('Обязательное поле!'),
  new_password: Yup.string().required('Обязательное поле!'),
})

export const PasswordForm = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      const { current_password, new_password } = values
      dispatch(changePassword(new_password, current_password))
        .then(() => onSuccess())
        .catch((error) => {
          if (error.response) {
            console.log('USLOVIE')
            const errors = error.response.data
            Object.keys(errors).forEach((key) => {
              formik.setFieldError(key, errors[key][0])
            })
          }
          onError()
        })
    },
  })
  const errorFieldStyle = { border: '1px solid red' }
  const onSuccess = (msg = 'Пароль успешно изменен') => {
    formik.setStatus({ status: 'ok', msg })
  }
  const onError = (msg = 'При смене пароля произошла ошибка') => {
    formik.setStatus({ status: 'error', msg })
  }
  return (
    <Form className={s.settingsForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="current_password" className={s.fieldGroup}>
        <Form.Label>Текущий пароль</Form.Label>
        <Form.Control
          name="current_password"
          style={formik.errors.current_password && errorFieldStyle}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.current_password}
        />
        {formik.errors.current_password ? (
          <span className={s.error}>{formik.errors.current_password}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="new_password" className={s.fieldGroup}>
        <Form.Label>Новый пароль</Form.Label>
        <Form.Control
          name="new_password"
          style={formik.errors.new_password && errorFieldStyle}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.new_password}
        />
        {formik.errors.new_password ? (
          <span className={s.error}>{formik.errors.new_password}</span>
        ) : null}
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Сменить пароль
      </Button>
      <SettingsStatusAlert status={formik.status} />
    </Form>
  )
}
