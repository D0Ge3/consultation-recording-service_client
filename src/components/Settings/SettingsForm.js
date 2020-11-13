import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { updateUserData } from '../../redux/actions/profileActions'

import { Form, Button } from 'react-bootstrap'

import s from './Settings.module.css'
import { SettingsStatusAlert } from './SettingStatusAlert'

const SettingsSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(1, 'Слишком короткое!')
    .max(50, 'Слишком длинное!')
    .required('Обязательное поле!'),
  last_name: Yup.string()
    .min(1, 'Слишком короткое!')
    .max(50, 'Слишком длинное!')
    .required('Обязательное поле!'),
  middle_name: Yup.string()
    .min(1, 'Слишком короткое!')
    .max(50, 'Слишком длинное!'),
  tel: Yup.string()
    .matches(/[+][0-9]{11}$/, { message: 'Неправильный номер!' }),
})

export const SettingsForm = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const formik = useFormik({
    initialValues: {
      last_name: profile.last_name,
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      tel: profile.tel,
    },
    validationSchema: SettingsSchema,
    onSubmit: (values) => {
      console.log(values)
      const data = { ...profile, ...values }
      dispatch(updateUserData(data))
        .then(() => onSuccess())
        .catch((error) => {
          if (error.response) {
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
  const onSuccess = (msg = 'Настройки успешно сохранены') => {
    formik.setStatus({ status: 'ok', msg })
  }
  const onError = (msg = 'Произошла ошибка') => {
    formik.setStatus({ status: 'error', msg })
  }
  return (
    <Form className={s.settingsForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="last_name" className={s.fieldGroup}>
        <Form.Label>Фамилия<sup>*</sup></Form.Label>
        <Form.Control
          required
          style={formik.errors.last_name && errorFieldStyle}
          name="last_name"
          type="text"
          placeholder="Введите фамилию"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {formik.errors.last_name ? (
          <span className={s.error}>{formik.errors.last_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="first_name" className={s.fieldGroup}>
        <Form.Label>Имя<sup>*</sup></Form.Label>
        <Form.Control
          required
          style={formik.errors.first_name && errorFieldStyle}
          name="first_name"
          type="text"
          placeholder="Введите имя"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        {formik.errors.first_name ? (
          <span className={s.error}>{formik.errors.first_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="middle_name" className={s.fieldGroup}>
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          name="middle_name"
          style={formik.errors.middle_name && errorFieldStyle}
          type="text"
          placeholder="Введите отчество"
          onChange={formik.handleChange}
          value={formik.values.middle_name}
        />
        {formik.errors.middle_name ? (
          <span className={s.error}>{formik.errors.middle_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="tel" className={s.fieldGroup}>
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          name="tel"
          style={formik.errors.tel && errorFieldStyle}
          type="tel"
          placeholder="Введите телефон"
          onChange={formik.handleChange}
          value={formik.values.tel}
        />
        {formik.errors.tel ? (
          <span className={s.error}>{formik.errors.tel}</span>
        ) : null}
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Сохранить
      </Button>
      <SettingsStatusAlert status={formik.status} />
    </Form>
  )
}
