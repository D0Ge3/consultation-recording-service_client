import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { getGroups, register } from '../../redux/actions/registrationActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form, Button, Spinner } from 'react-bootstrap'

import s from './Registration.module.css'

const RegistrationSchema = Yup.object().shape({
  last_name: Yup.string()
    .matches(/[А-Я]{1}[а-я]{1,}/, {
      message: 'Неправильный формат фамилии!',
    })
    .required('Обязательное поле!'),
  first_name: Yup.string()
    .matches(/[А-Я]{1}[а-я]{1,}/, {
      message: 'Неправильный формат имени!',
    })
    .required('Обязательное поле!'),
  middle_name: Yup.string().matches(/[А-Я]{1}[а-я]{1,}/, {
    message: 'Неправильный формат отчества!',
  }),
  tel: Yup.string().matches(/(?:\+|\d)[\d\-]{9,}\d/, {
    message: 'Неправильный формат телефона!',
  }),
  employee_number: Yup.number()
    .min(100000, 'Неправильный таб. номер!')
    .max(999999, 'Неправильный таб. номер!')
    .required('Обязательное поле!'),
  email: Yup.string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      { message: 'Неправильный формат email!' }
    )
    .required('Обязательное поле!'),
  password: Yup.string().required('Обязательное поле!'),
  repeat_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Пароли должны совпадать!'
  ),
  group: Yup.string().required('Обязательное поле!'),
})

export const RegistrationForm = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.registration.groups)
  const formik = useFormik({
    initialValues: {
      last_name: '',
      first_name: '',
      middle_name: '',
      email: '',
      tel: '',
      employee_number: '',
      role: 'student',
      group: '',
      password: '',
      repeat_password: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: (values) => {
      dispatch(register(values))
        .then(() => formik.resetForm())
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            const errors = error.response.data
            formik.setErrors({
              ...errors,
              password: errors.password ? errors.password[0] : null,
            })
          } else {
            catchNetworkError(error, dispatch)
          }
        })
        .finally(() => formik.setSubmitting(false))
    },
  })

  useEffect(() => {
    dispatch(getGroups())
  }, [])

  useEffect(() => {
    if (formik.values.role === 'teacher') {
      formik.values.group = '11111'
    } else {
      formik.values.group = ''
    }
  }, [formik.values.role])

  const errorFieldStyle = { border: '1px solid red' }

  const { errors, touched } = formik

  const groupOptions = groups.map((g) => <option key={g}>{g}</option>)

  const showErrorBorder = (key) => errors[key] && touched[key] && errorFieldStyle
  const showError = (key) =>
    errors[key] && touched[key] ? (
      <span className={s.error}>{errors[key]}</span>
    ) : null

  return (
    <Form className={s.regForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="last_name" className={s.fieldGroup}>
        <Form.Control
          style={showErrorBorder('last_name')}
          name="last_name"
          type="text"
          placeholder="Введите фамилию*"
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {showError('last_name')}
      </Form.Group>
      <Form.Group controlId="first_name" className={s.fieldGroup}>
        <Form.Control
          style={showErrorBorder('first_name')}
          name="first_name"
          type="text"
          placeholder="Введите имя*"
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        {showError('first_name')}
      </Form.Group>
      <Form.Group controlId="middle_name" className={s.fieldGroup}>
        <Form.Control
          name="middle_name"
          style={showErrorBorder('middle_name')}
          type="text"
          placeholder="Введите отчество"
          onChange={formik.handleChange}
          value={formik.values.middle_name}
        />
        {showError('middle_name')}
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Control
          style={showErrorBorder('email')}
          name="email"
          placeholder="Email*"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {showError('email')}
      </Form.Group>
      <Form.Group controlId="tel" className={s.fieldGroup}>
        <Form.Control
          name="tel"
          style={showErrorBorder('tel')}
          type="tel"
          placeholder="Введите телефон"
          onChange={formik.handleChange}
          value={formik.values.tel}
        />
        {showError('tel')}
      </Form.Group>
      <Form.Group controlId="employee_number">
        <Form.Control
          style={showErrorBorder('employee_number')}
          name="employee_number"
          maxLength={6}
          placeholder="Табельный номер*"
          onChange={formik.handleChange}
          value={formik.values.employee_number}
        />
        {showError('employee_number')}
      </Form.Group>
      <Form.Group controlId="role">
        <Form.Label>
          <span className={s.roleTitle}>Кто вы?</span>
        </Form.Label>
        <Form.Check
          id="Студент"
          name="role"
          type="radio"
          label="Студент"
          value="student"
          onChange={formik.handleChange}
          checked={formik.values.role === 'student'}
        />
        <Form.Check
          id="Преподаватель"
          name="role"
          type="radio"
          label="Преподаватель"
          value="teacher"
          onChange={formik.handleChange}
          checked={formik.values.role === 'teacher'}
        />
      </Form.Group>
      {formik.values.role === 'student' && (
        <Form.Group controlId="group">
          <Form.Control
            as="select"
            style={showErrorBorder('group')}
            name="group"
            value={formik.values.group}
            onChange={formik.handleChange}
            placeholder="Группа"
            custom
          >
            <option disabled value={''} key={''}>
              Группа*
            </option>
            {groupOptions}
          </Form.Control>
          {showError('group')}
        </Form.Group>
      )}

      <Form.Group controlId="password">
        <Form.Control
          style={
            (errors.password && touched.password) ||
            (errors.repeat_password && touched.repeat_password)
              ? errorFieldStyle
              : {}
          }
          name="password"
          type="password"
          placeholder="Пароль*"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {showError('password')}
      </Form.Group>
      <Form.Group controlId="repeat_password">
        <Form.Control
          style={
            (errors.password && touched.password) ||
            (errors.repeat_password && touched.repeat_password)
              ? errorFieldStyle
              : {}
          }
          name="repeat_password"
          type="password"
          placeholder="Повторите пароль*"
          onChange={formik.handleChange}
          value={formik.values.repeat_password}
        />
        {(errors.repeat_password && touched.repeat_password) ||
        (errors.password && touched.password) ? (
          <span className={s.error}>
            {errors.repeat_password || errors.password}
          </span>
        ) : null}
      </Form.Group>
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
        <span>Зарегистрироваться</span>
      </Button>
    </Form>
  )
}
