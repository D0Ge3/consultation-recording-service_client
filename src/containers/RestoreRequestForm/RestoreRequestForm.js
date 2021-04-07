import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Alert } from 'react-bootstrap'

import { TextField } from '../../common/TextField/TextField'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

import s from './RestoreRequestForm.module.css'
import { resetPasswordReq } from '../../redux/actions/authActions'

const RestoreRequestSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      { message: 'Неправильный формат email!' }
    )
    .required('Обязательное поле!'),
})

export const RestoreRequestForm = () => {
  const dispatch = useDispatch()

  const [success, setSuccess] = useState()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: RestoreRequestSchema,
    onSubmit: (values) => {
      formik.setStatus(null)
      const { email } = values
      dispatch(resetPasswordReq(email))
        .then(() => {
          setSuccess(true)
        })
        .catch(() => {
          setSuccess(false)
        })
        .finally(() => formik.setSubmitting(false))
    },
  })

  const { errors, touched } = formik
  return (
    <Form className={s.restoreForm} onSubmit={formik.handleSubmit}>
      <p className="h4 font-weight-normal">Восстановление аккаунта</p>
      {success && (
        <Alert variant="success" className={s.successAlert}>
          На вашу почту было отправлено письмо, содержащее ссылку для сброса
          пароля!
        </Alert>
      )}
      {success === false && (
        <Alert variant="danger" className={s.successAlert}>
          При восстановлении аккаунта произошла ошибка!
        </Alert>
      )}
      <TextField
        name="email"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={touched.email && errors.email}
      />
      <SpinnerButton
        disabled={formik.isSubmitting}
        variant="primary"
        type="submit"
      >
        Отправить
      </SpinnerButton>
    </Form>
  )
}
