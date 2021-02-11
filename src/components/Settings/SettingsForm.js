import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { setIsShowFormStatus } from '../../redux/actions/appActions'
import { updateUserData } from '../../redux/actions/profileActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form, Button, Spinner } from 'react-bootstrap'

import s from './Settings.module.css'
import { FormAlert } from '../../ui/FormAlert/FormAlert'

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
    .matches(/^[+][0-9]{11}$/, { message: 'Неправильный формат номера!' }),
})

export const SettingsForm = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const showFormAlert = useSelector((state) => state.app.isShowFormStatus)
  const formik = useFormik({
    initialValues: {
      last_name: profile.last_name,
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      tel: profile.tel,
    },
    validationSchema: SettingsSchema,
    onSubmit: (values) => {
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
          catchNetworkError(error, dispatch)
        })
        .finally(() => {
          formik.setSubmitting(false)
          dispatch(setIsShowFormStatus(true))
        })
    },
  })
  const { errors, touched } = formik

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
          style={errors.last_name && touched.last_name && errorFieldStyle}
          name="last_name"
          type="text"
          placeholder="Введите фамилию"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {errors.last_name && touched.last_name ? (
          <span className={s.error}>{errors.last_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="first_name" className={s.fieldGroup}>
        <Form.Label>Имя<sup>*</sup></Form.Label>
        <Form.Control
          style={errors.first_name && touched.first_name && errorFieldStyle}
          name="first_name"
          type="text"
          placeholder="Введите имя"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        {errors.first_name && touched.first_name ? (
          <span className={s.error}>{errors.first_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="middle_name" className={s.fieldGroup}>
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          name="middle_name"
          style={errors.middle_name && touched.middle_name && errorFieldStyle}
          type="text"
          placeholder="Введите отчество"
          onChange={formik.handleChange}
          value={formik.values.middle_name}
        />
        {errors.middle_name && touched.middle_name ? (
          <span className={s.error}>{errors.middle_name}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="tel" className={s.fieldGroup}>
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          name="tel"
          style={errors.tel && touched.tel && errorFieldStyle}
          type="tel"
          placeholder="Введите телефон"
          onChange={formik.handleChange}
          value={formik.values.tel}
        />
        {errors.tel && touched.tel ? (
          <span className={s.error}>{errors.tel}</span>
        ) : null}
      </Form.Group>
      <div className={s.submitWrapper}>
        <Button disabled={formik.isSubmitting} variant="primary" type="submit">
          {formik.isSubmitting && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
          )}
          <span>Сохранить</span>
        </Button>
        <div className={'ml-5'}>
          <FormAlert status={formik.status} />
        </div>
      </div>
    </Form>
  )
}
