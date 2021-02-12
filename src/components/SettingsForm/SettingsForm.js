import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { setIsShowFormStatus } from '../../redux/actions/appActions'
import { updateUserData } from '../../redux/actions/profileActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form } from 'react-bootstrap'
import { FormAlert } from '../../common/FormAlert/FormAlert'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

import s from './SettingsForm.module.css'
import { TextField } from '../../common/TextField/TextField'

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
  tel: Yup.string().matches(/^[+][0-9]{11}$/, {
    message: 'Неправильный формат номера!',
  }),
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

  const onSuccess = (msg = 'Настройки успешно сохранены') => {
    formik.setStatus({ status: 'ok', msg })
  }
  const onError = (msg = 'Произошла ошибка') => {
    formik.setStatus({ status: 'error', msg })
  }
  return (
    <Form className={s.settingsForm} onSubmit={formik.handleSubmit}>
      <TextField
        name="last_name"
        type="text"
        placeholder="Введите фамилию"
        onChange={formik.handleChange}
        value={formik.values.last_name}
        label="Фамилия*"
        error={touched.last_name && errors.last_name}
      />
      <TextField
        name="first_name"
        type="text"
        placeholder="Введите имя"
        onChange={formik.handleChange}
        value={formik.values.first_name}
        label="Имя*"
        error={touched.first_name && errors.first_name}
      />
      <TextField
        name="middle_name"
        type="text"
        placeholder="Введите имя"
        onChange={formik.handleChange}
        value={formik.values.middle_name}
        label="Отчество"
        error={touched.middle_name && errors.middle_name}
      />
      <TextField
        name="tel"
        type="tel"
        placeholder="Введите телефон"
        onChange={formik.handleChange}
        value={formik.values.tel}
        label="Телефон"
        error={touched.tel && errors.tel}
      />
      <div className={s.submitWrapper}>
        <SpinnerButton
          disabled={formik.isSubmitting}
          variant="primary"
          type="submit"
        >
          Сохранить
        </SpinnerButton>
        {showFormAlert && (
          <div className={'ml-5'}>
            <FormAlert status={formik.status} />
          </div>
        )}
      </div>
    </Form>
  )
}
