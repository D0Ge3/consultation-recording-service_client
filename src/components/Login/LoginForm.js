import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../redux/actions/authActions'
import { FormAlert } from '../../ui/FormAlert/FormAlert'

import { Form, Button } from 'react-bootstrap'

import s from './Login.module.css'

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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, password, rememberMe } = values
      dispatch(login(email, password, rememberMe)).catch((error) => {
        if (error.response.status === 401) {
          formik.setStatus({
            status: 'error',
            msg: 'Неправильный логин или пароль!',
          })
        }
      })
    },
  })

  const errorFieldStyle = { border: '1px solid red' }

  const { errors, touched } = formik

  return (
    <Form className={s.loginForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="email">
        <Form.Control
          style={errors.email && touched.email && errorFieldStyle}
          name="email"
          // type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {errors.email && touched.email ? (
          <span className={s.error}>{errors.email}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          style={errors.password && touched.password && errorFieldStyle}
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {errors.password && touched.password ? (
          <span className={s.error}>{errors.password}</span>
        ) : null}
      </Form.Group>
      <div className={s.wrapper}>
        <Form.Group controlId="rememberMe">
          <Form.Check
            name="rememberMe"
            type="checkbox"
            label="Запомнить"
            onChange={formik.handleChange}
            value={formik.values.rememberMe}
          />
        </Form.Group>
        <Link to="/restore">Забыли пароль?</Link>
      </div>
      <div className={'mb-2'}>
        <FormAlert status={formik.status} />
      </div>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
}
