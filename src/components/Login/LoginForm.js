import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/actions/authActions'

import { Form, Button } from 'react-bootstrap'

import s from './Login.module.css'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values) => {
      const { email, password, rememberMe } = values
      dispatch(login(email, password, rememberMe))
    },
  })
  return (
    <Form className={s.loginForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="email">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Group>
      <Form.Group controlId="password">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Group>
      <Form.Group controlId="rememberMe">
        <Form.Check
          name="rememberMe"
          type="checkbox"
          label="Remember me"
          onChange={formik.handleChange}
          value={formik.values.rememberMe}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
}
