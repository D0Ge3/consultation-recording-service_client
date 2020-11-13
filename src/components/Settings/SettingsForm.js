import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import {
  updateUserData,
  changePassword,
} from '../../redux/actions/profileActions'

import { Form, Button } from 'react-bootstrap'

import s from './Settings.module.css'
import { SettingsStatusAlert } from './SettingStatusAlert'

export const SettingsForm = () => {
  const dispatch = useDispatch()
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [status, setStatus] = useState(null)
  const profile = useSelector((state) => state.profile)
  const formik = useFormik({
    initialValues: {
      last_name: profile.last_name,
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      tel: profile.tel,
      current_password: '',
      new_password: '',
    },
    onSubmit: (values) => {
      console.log(values)
      const data = { ...profile, ...values }
      dispatch(updateUserData(data))
        .then(() => onSuccess())
        .catch(() => onError())
      const { current_password, new_password } = values
      if (current_password !== '' && new_password !== '') {
        dispatch(changePassword(new_password, current_password))
          .then(() => onSuccess('Пароль успешно изменен', 'password'))
          .catch(() => onError('При смене пароля произошла ошибка', 'password'))
      }
    },
  })

  const onSuccess = (
    msg = 'Настройки успешно сохранены',
    type = 'settings'
  ) => {
    if (type === 'settings') {
      setStatus({ status: 'ok', msg })
    } else {
      setPasswordStatus({ status: 'ok', msg })
    }
  }
  const onError = (msg = 'Произошла ошибка', type = 'settings') => {
    if (type === 'settings') {
      setStatus({ status: 'error', msg })
    } else {
      setPasswordStatus({ status: 'error', msg })
    }
  }
  return (
    <Form className={s.settingsForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="last_name">
        <Form.Label>Фамилия<sup>*</sup></Form.Label>
        <Form.Control
          required
          name="last_name"
          type="text"
          placeholder="Введите фамилию"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
      </Form.Group>
      <Form.Group controlId="first_name">
        <Form.Label>Имя<sup>*</sup></Form.Label>
        <Form.Control
          required
          name="first_name"
          type="text"
          placeholder="Введите имя"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
      </Form.Group>
      <Form.Group controlId="middle_name">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          name="middle_name"
          type="text"
          placeholder="Введите отчество"
          onChange={formik.handleChange}
          value={formik.values.middle_name}
        />
      </Form.Group>
      <Form.Group controlId="tel">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          name="tel"
          type="tel"
          placeholder="Введите телефон"
          onChange={formik.handleChange}
          value={formik.values.tel}
        />
      </Form.Group>
      <Form.Group controlId="current_password">
        <Form.Label>Текущий пароль</Form.Label>
        <Form.Control
          name="current_password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.current_password}
        />
      </Form.Group>
      <Form.Group controlId="new_password">
        <Form.Label>Новый пароль</Form.Label>
        <Form.Control
          name="new_password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.new_password}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Сохранить
      </Button>
      <SettingsStatusAlert status={status} />
      <SettingsStatusAlert status={passwordStatus} />
    </Form>
  )
}
