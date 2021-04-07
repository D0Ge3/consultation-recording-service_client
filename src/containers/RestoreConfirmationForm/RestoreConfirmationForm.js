import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Form, Alert, Button } from 'react-bootstrap'

import { TextField } from '../../common/TextField/TextField'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

import s from './RestoreConfirmationForm.module.css'
import { resetPasswordConfirm } from '../../redux/actions/authActions'

const RestoreConfirmationSchema = Yup.object().shape({
  new_password: Yup.string().required('Обязательное поле!'),
  repeat_password: Yup.string().oneOf(
    [Yup.ref('new_password'), null],
    'Пароли должны совпадать!'
  ),
})

export const RestoreConfirmationForm = () => {
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [success, setSuccess] = useState()

  const formik = useFormik({
    initialValues: {
      new_password: '',
      repeat_password: '',
    },
    validationSchema: RestoreConfirmationSchema,
    onSubmit: (values) => {
      console.log(values)
      const { new_password } = values
      const { uid, token } = params
      dispatch(resetPasswordConfirm(uid, token, new_password))
        .then(() => {
          setSuccess(true)
        })
        .catch((error) => {
          setSuccess(false)
          if (error.response && error.response.status === 400) {
            const errors = error.response.data
            formik.setErrors({
              ...errors,
              password: errors.password ? errors.password[0] : null,
            })
          }
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
          Пароль успешно сброшен!
        </Alert>
      )}
      {success === false && (
        <Alert variant="danger" className={s.successAlert}>
          При сбросе пароля произошла ошибка!
        </Alert>
      )}
      <TextField
        name="new_password"
        type="password"
        placeholder="Новый пароль*"
        onChange={formik.handleChange}
        value={formik.values.new_password}
        error={
          errors.new_password && touched.new_password
            ? errors.new_password
            : errors.repeat_password && touched.repeat_password
            ? errors.repeat_password
            : null
        }
      />
      <TextField
        name="repeat_password"
        type="password"
        placeholder="Повторите пароль*"
        onChange={formik.handleChange}
        value={formik.values.repeat_password}
        error={
          errors.new_password && touched.new_password
            ? errors.new_password
            : errors.repeat_password && touched.repeat_password
            ? errors.repeat_password
            : null
        }
      />
      <div style={{ marginBottom: '10px' }}>
        <SpinnerButton
          disabled={formik.isSubmitting}
          variant="primary"
          type="submit"
        >
          Отправить
        </SpinnerButton>
      </div>
      <div>
        <Button variant="primary" onClick={() => history.push('/login')}>
          Перейти к авторизации
        </Button>
      </div>
    </Form>
  )
}
