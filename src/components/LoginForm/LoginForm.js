import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../redux/actions/authActions'
import { setIsShowFormStatus } from '../../redux/actions/appActions'

import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { FormAlert } from '../../common/FormAlert/FormAlert'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

import { Form } from 'react-bootstrap'

import s from './LoginForm.module.css'
import { TextField } from '../../common/TextField/TextField'
import { Checkbox } from '../../common/Checkbox/Checkbox'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      { message: 'Неправильный формат email!' }
    )
    .required('Обязательное поле!'),
  password: Yup.string().required('Обязательное поле!'),
})

export const LoginForm = () => {
  const dispatch = useDispatch()
  const showFormAlert = useSelector((state) => state.app.isShowFormStatus)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      formik.setStatus(null)
      const { email, password, rememberMe } = values
      dispatch(login(email, password, rememberMe))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            formik.setStatus({
              status: 'error',
              msg: 'Неправильный логин или пароль!',
            })
          } else {
            catchNetworkError(error, dispatch)
          }
        })
        .finally(() => {
          formik.setSubmitting(false)
          dispatch(setIsShowFormStatus(true))
        })
    },
  })

  const { errors, touched } = formik

  return (
    <Form className={s.loginForm} onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={touched.email && errors.email}
      />
      <TextField
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={touched.password && errors.password}
      />
      <div className={s.wrapper}>
        <Checkbox
          name="rememberMe"
          label="Запомнить"
          onChange={formik.handleChange}
          value={formik.values.rememberMe}
        />
        <Link to="/restore">Забыли пароль?</Link>
      </div>
      <SpinnerButton
        disabled={formik.isSubmitting}
        variant="primary"
        type="submit"
      >
        Войти
      </SpinnerButton>
      {showFormAlert && (
        <div className={'mb-2'}>
          <FormAlert status={formik.status} />
        </div>
      )}
    </Form>
  )
}