import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { setIsShowFormStatus } from '../../redux/actions/appActions'
import { changePassword } from '../../redux/actions/profileActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form } from 'react-bootstrap'
import { FormAlert } from '../../common/FormAlert/FormAlert'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'
import { TextField } from '../../common/TextField/TextField'

import s from './SettingsForm.module.css'

const PasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('Обязательное поле!'),
  new_password: Yup.string().required('Обязательное поле!'),
})

export const PasswordForm = () => {
  const dispatch = useDispatch()
  const showFormAlert = useSelector((state) => state.app.isShowFormStatus)
  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      const { current_password, new_password } = values
      dispatch(changePassword(new_password, current_password))
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

  const onSuccess = (msg = 'Пароль успешно изменен') => {
    formik.setStatus({ status: 'ok', msg })
  }
  const onError = (msg = 'При смене пароля произошла ошибка') => {
    formik.setStatus({ status: 'error', msg })
  }
  return (
    <Form className={s.settingsForm} onSubmit={formik.handleSubmit}>
      <TextField
        name="current_password"
        type="password"
        label="Текущий пароль"
        onChange={formik.handleChange}
        value={formik.values.current_password}
        error={touched.current_password && errors.current_password}
      />
      <TextField
        name="new_password"
        type="password"
        label="Новый пароль"
        onChange={formik.handleChange}
        value={formik.values.new_password}
        error={touched.new_password && errors.new_password}
      />
      <div className={s.submitWrapper}>
        <SpinnerButton
          disabled={formik.isSubmitting}
          variant="primary"
          type="submit"
        >
          Сменить пароль
        </SpinnerButton>
        {showFormAlert && (
          <div className="ml-5">
            <FormAlert status={formik.status} />
          </div>
        )}
      </div>
    </Form>
  )
}
