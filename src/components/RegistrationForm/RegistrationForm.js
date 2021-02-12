import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { getGroups, register } from '../../redux/actions/registrationActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form } from 'react-bootstrap'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

import s from './RegistrationForm.module.css'
import { TextField } from '../../common/TextField/TextField'
import { Radio } from '../../common/Radio/Radio'
import { Select } from '../../common/Select/Select'

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

  const { errors, touched } = formik

  const roleOptions = [
    {
      id: 'Студент',
      label: 'Студент',
      value: 'student',
    },
    {
      id: 'Преподаватель',
      label: 'Преподаватель',
      value: 'teacher',
    },
  ]
  return (
    <Form className={s.regForm} onSubmit={formik.handleSubmit}>
      <TextField
        name="last_name"
        type="text"
        placeholder="Введите фамилию*"
        onChange={formik.handleChange}
        value={formik.values.last_name}
        error={touched.last_name && errors.last_name}
      />
      <TextField
        name="first_name"
        type="text"
        placeholder="Введите имя*"
        onChange={formik.handleChange}
        value={formik.values.first_name}
        error={touched.first_name && errors.first_name}
      />
      <TextField
        name="middle_name"
        type="text"
        placeholder="Введите отчество"
        onChange={formik.handleChange}
        value={formik.values.middle_name}
        error={touched.middle_name && errors.middle_name}
      />
      <TextField
        name="email"
        placeholder="Email*"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={touched.email && errors.email}
      />
      <TextField
        name="tel"
        type="tel"
        placeholder="Введите телефон"
        onChange={formik.handleChange}
        value={formik.values.tel}
        error={touched.tel && errors.tel}
      />
      <TextField
        name="employee_number"
        maxLength={6}
        placeholder="Табельный номер*"
        onChange={formik.handleChange}
        value={formik.values.employee_number}
        error={touched.employee_number && errors.employee_number}
      />
      <Radio
        name="role"
        onChange={formik.handleChange}
        value={formik.values.role}
        label={'Кто вы?'}
        labelStyle={{ fontWeight: 'bold' }}
        options={roleOptions}
      />
      {formik.values.role === 'student' && (
        <Select
          name="group"
          value={formik.values.group}
          onChange={formik.handleChange}
          placeholder="Группа*"
          options={groups}
          error={touched.group && errors.group}
        />
      )}
      <TextField
        name="password"
        type="password"
        placeholder="Пароль*"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={
          errors.password && touched.password
            ? errors.password
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
          errors.password && touched.password
            ? errors.password
            : errors.repeat_password && touched.repeat_password
            ? errors.repeat_password
            : null
        }
      />
      <SpinnerButton
        disabled={formik.isSubmitting}
        variant="primary"
        type="submit"
      >
        Зарегистрироваться
      </SpinnerButton>
    </Form>
  )
}
