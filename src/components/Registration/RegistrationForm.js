import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { FormAlert } from '../../ui/FormAlert/FormAlert'

import { Form, Button } from 'react-bootstrap'

import s from './Registration.module.css'

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      { message: 'Неправильный формат email!' }
    )
    .required('Обязательное поле!'),
  password: Yup.string().required('Обязательное поле!'),
})

export const RegistrationForm = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: RegistrationSchema,
    onSubmit: (values) => {
      const { email, password, rememberMe } = values
      // dispatch(login(email, password, rememberMe)).catch((error) => {
      //   if (error.response.status === 401) {
      //     formik.setStatus({
      //       status: 'error',
      //       msg: 'Неправильный логин или пароль!',
      //     })
      //   }
      // })
    },
  })

  const errorFieldStyle = { border: '1px solid red' }

  const { errors, touched } = formik

  return (
    <Form className={s.loginForm} onSubmit={formik.handleSubmit}>
      <Form.Group controlId="last_name" className={s.fieldGroup}>
        {/* <Form.Label>Фамилия<sup>*</sup></Form.Label> */}
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
        {/* <Form.Label>Имя<sup>*</sup></Form.Label> */}
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
        {/* <Form.Label>Отчество</Form.Label> */}
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
      <Form.Group controlId="tel" className={s.fieldGroup}>
        {/* <Form.Label>Телефон</Form.Label> */}
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
      <Form.Group controlId="employee_number">
        <Form.Control
          style={errors.employee_number && touched.employee_number && errorFieldStyle}
          name="employee_number"
          // type="email"
          placeholder="Табельный номер"
          onChange={formik.handleChange}
          value={formik.values.employee_number}
        />
        {errors.employee_number && touched.employee_number ? (
          <span className={s.error}>{errors.employee_number}</span>
        ) : null}
      </Form.Group>
      <Form.Group controlId="role">
        {/* <Form.Label>Тип записи</Form.Label> */}
        <Form.Check
          id="Студент"
          name="role"
          type="radio"
          label="Студент"
          value="Студент"
          onChange={formik.handleChange}
          // checked={formik.values.method_wrote === 'свободный'}
        />
        <Form.Check
          id="Преподаватель"
          name="role"
          type="radio"
          label="Преподаватель"
          value="Преподаватель"
          onChange={formik.handleChange}
          // checked={formik.values.method_wrote === 'по времени'}
        />
      </Form.Group>
      {/* ГРУППА */}
      <Form.Group controlId="exampleForm.ControlSelect1">
        {/* <Form.Label>Example select</Form.Label> */}
        <Form.Control as="select">
          <option disabled selected>Группа</option>
          <option>Y2435</option>
          <option>Y2436</option>
          <option>Y2437</option>
          <option>Y2438</option>
        </Form.Control>
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
      <Form.Group controlId="repeat_password">
        <Form.Control
          style={errors.password && touched.password && errorFieldStyle}
          name="repeat_password"
          type="password"
          placeholder="Повторите пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {errors.password && touched.password ? (
          <span className={s.error}>{errors.password}</span>
        ) : null}
      </Form.Group>


      <div className={'mb-2'}>
        <FormAlert status={formik.status} />
      </div>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  )
}
