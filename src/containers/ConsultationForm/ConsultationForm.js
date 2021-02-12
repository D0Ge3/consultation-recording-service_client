import React, { useState, useEffect, useRef } from 'react'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import {
  createConsultation,
  getConsultation,
  setSelectedConsultation,
  updateConsultation,
} from '../../redux/actions/consultationsActions'
import { setIsShowFormStatus } from '../../redux/actions/appActions'
import { catchNetworkError } from '../../redux/actions/helpers/catchNetworkError'

import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown'
import Datetime from 'react-datetime'
import { ConsultationTimeInfo } from './ConsultationTimeInfo'
import { generateTimeTickets } from './utils/generateTimeTickets'
import { FormAlert } from '../../common/FormAlert/FormAlert'

import 'react-datetime/css/react-datetime.css'
import s from './ConsultationForm.module.css'
import { SpinnerButton } from '../../common/SpinnerButton/SpinnerButton'

const ConsultationSchema = Yup.object().shape({
  teacher_subject: Yup.array()
    .required('Не выбрана дисциплина(ы)!')
    .min(1, 'Не выбрана дисциплина(ы)!'),
  start_time: Yup.object().required('Обязательное поле!'),
  end_time: Yup.object().required('Обязательное поле!'),
  consultation_type: Yup.string().required('Не выбран тип консультации!'),
  method_wrote: Yup.string().required('Не выбран тип!'),
  recommended_qnt_students: Yup.number().required('Обязательное поле!'),
  link: Yup.string(),
  note: Yup.string(),
  location: Yup.string(),
})

export const ConsultationForm = ({ mode }) => {
  const [showTimeInfo, setShowTimeInfo] = useState(false)
  let multiselectRef = useRef(null)

  let { id_consultation } = useParams()
  const [status, setStatus] = useState(null)

  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.profile.subjects)
  const selectedConsultation = useSelector(
    (state) => state.consultations.selectedConsultation
  )
  const showFormAlert = useSelector((state) => state.app.isShowFormStatus)

  const formik = useFormik({
    initialValues: {
      start_time: '',
      end_time: '',
      recommended_qnt_students: '',
      note: '',
      method_wrote: '',
      consultation_type: 'Очная',
      time_on_one_student: null,
      location: '',
      link: '',
      teacher_subject: [],
      times: [],
    },
    validationSchema: ConsultationSchema,
    onSubmit: (values) => {
      setStatus(null)
      if (mode === 'create') {
        dispatch(createConsultation(values))
          .then(() => onSave())
          .catch((error) => onError(error))
          .finally(() => formik.setSubmitting(false))
      } else if (mode === 'edit') {
        dispatch(updateConsultation(values))
          .then(() => onSave())
          .catch((error) => onError(error))
          .finally(() => {
            formik.setSubmitting(false)
            dispatch(setIsShowFormStatus(true))
          })
      }
    },
  })
  const onSave = () => {
    if (mode === 'create') {
      multiselectRef.current.resetSelectedValues()
      formik.resetForm()
      formik.setStatus({
        status: 'ok',
        msg: 'Консультация успешно создана',
      })
    } else if (mode === 'edit') {
      formik.setStatus({
        status: 'ok',
        msg: 'Консультация успешно сохранена',
      })
    }
    setShowTimeInfo(false)
  }
  const onError = (error) => {
    if (error.response) {
      formik.setStatus({
        status: 'error',
        msg: 'Произошла ошибка на сервере',
      })
    } else if (error.request) {
      formik.setStatus({
        status: 'error',
        msg: 'Ошибка соединения. Повторите попытку',
      })
    }
    catchNetworkError(error, dispatch)
    setShowTimeInfo(false)
  }
  useEffect(() => {
    if (mode === 'edit') {
      dispatch(getConsultation(id_consultation))
      return () => dispatch(setSelectedConsultation(null))
    }
  }, [])
  useEffect(() => {
    if (selectedConsultation) {
      formik.setValues({
        ...selectedConsultation,
        teacher_subject: selectedConsultation.subjects,
        start_time: moment(selectedConsultation.start_time),
        end_time: moment(selectedConsultation.end_time),
      })
    }
  }, [selectedConsultation])
  useEffect(() => {
    setStatus(formik.status)
  }, [formik.status])

  const isFuture = (date) => {
    let yesterday = Datetime.moment().subtract(1, 'day')
    return date.isAfter(yesterday)
  }
  const {
    start_time,
    end_time,
    recommended_qnt_students,
    method_wrote,
    time_on_one_student,
  } = formik.values
  useEffect(() => {
    if (
      start_time &&
      end_time &&
      recommended_qnt_students &&
      method_wrote === 'по времени'
    ) {
      getTimeTickets(start_time, end_time, recommended_qnt_students)
    }
  }, [start_time, end_time, recommended_qnt_students, method_wrote])

  const getTimeTickets = (start_time, end_time, recommended_qnt_students) => {
    setShowTimeInfo(false)
    const timeTickets = generateTimeTickets(
      start_time,
      end_time,
      recommended_qnt_students
    )
    formik.setFieldValue('times', timeTickets.time)
    formik
      .setFieldValue('time_on_one_student', timeTickets.timeOneStudent)
      .then(() => setShowTimeInfo(true))
  }
  const type = formik.values.consultation_type
  const { errors, touched } = formik
  const errorFieldStyle = { border: '1px solid red' }

  const showError = (key) =>
    errors[key] && touched[key] ? (
      <span className={s.error}>{errors[key]}</span>
    ) : null
  const showErrorBorder = (key, isClassName = false) => {
    if (isClassName) {
      return errors[key] && touched[key] ? s.errorDateTime : {}
    } else {
      return errors[key] && touched[key] && errorFieldStyle
    }
  }
  return (
    <Container className="mt-4">
      <h5 className="text-center">
        {mode === 'create' && 'Создание '}
        {mode === 'edit' && 'Редактирование '}
        консультации
      </h5>
      <Form className={s.loginForm} onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="teacher_subject">
              <Form.Label>Дисциплины</Form.Label>
              <Multiselect
                ref={multiselectRef}
                options={subjects}
                placeholder="Выберите дисциплины"
                selectedValues={formik.values.teacher_subject}
                onSelect={(v) => formik.setFieldValue('teacher_subject', v)}
                onRemove={(v) => formik.setFieldValue('teacher_subject', v)}
                emptyRecordMsg="Нет дисциплин"
                displayValue="subject"
                style={{
                  searchBox: {
                    padding: '.375rem .75rem',
                    border:
                      errors.teacher_subject && touched.teacher_subject
                        ? errorFieldStyle.border
                        : null,
                  },
                }}
              />
              {showError('teacher_subject')}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="start_time">
              <Form.Label>Начало</Form.Label>
              <Datetime
                value={formik.values.start_time}
                onChange={(v) => formik.setFieldValue('start_time', v)}
                inputProps={{
                  disabled: mode === 'edit' && method_wrote === 'по времени',
                  placeholder: 'дд.мм.гггг чч:мм',
                }}
                locale="ru"
                isValidDate={isFuture}
                className={showErrorBorder('start_time', true)}
              />
              {showError('start_time')}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="end_time">
              <Form.Label>Конец</Form.Label>
              <Datetime
                value={formik.values.end_time}
                onChange={(v) => formik.setFieldValue('end_time', v)}
                inputProps={{
                  disabled: mode === 'edit' && method_wrote === 'по времени',
                  placeholder: 'чч:мм',
                }}
                locale="ru"
                dateFormat={false}
                className={showErrorBorder('end_time', true)}
              />
              {showError('end_time')}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <Form.Group
                controlId="consultation_type"
                className={s.typeCheckBox}
              >
                <Form.Label>Тип консультации</Form.Label>
                <Form.Check
                  id="Очная"
                  name="consultation_type"
                  type="radio"
                  label="Очная"
                  value="Очная"
                  onChange={(v) => {
                    formik.handleChange(v)
                    formik.setFieldValue('link', '')
                  }}
                  checked={formik.values.consultation_type === 'Очная'}
                />
                <Form.Check
                  id="Дистанционная"
                  name="consultation_type"
                  type="radio"
                  label="Дистанционная"
                  value="Дистанционная"
                  onChange={(v) => {
                    formik.handleChange(v)
                    formik.setFieldValue('location', '')
                  }}
                  checked={formik.values.consultation_type === 'Дистанционная'}
                />
                {showError('consultation_type')}
              </Form.Group>
              <Form.Group
                controlId="method_wrote"
                className={s.methodWroteCheckBox}
              >
                <Form.Label>Тип записи</Form.Label>
                <Form.Check
                  id="свободный"
                  name="method_wrote"
                  type="radio"
                  disabled={mode === 'edit'}
                  label="Свободный"
                  value="свободный"
                  onChange={formik.handleChange}
                  checked={formik.values.method_wrote === 'свободный'}
                />
                <Form.Check
                  id="по времени"
                  name="method_wrote"
                  type="radio"
                  disabled={mode === 'edit'}
                  label="По времени"
                  value="по времени"
                  onChange={formik.handleChange}
                  checked={formik.values.method_wrote === 'по времени'}
                />
                {showError('method_wrote')}
              </Form.Group>
            </div>
            {showTimeInfo && (
              <ConsultationTimeInfo time_on_one_student={time_on_one_student} />
            )}
          </Col>
          <Col>
            <Form.Group controlId={type === 'Очная' ? 'location' : 'link'}>
              <Form.Label>
                {type === 'Очная' ? 'Место проведения' : 'Cсылка'}
              </Form.Label>
              <Form.Control
                name={type === 'Очная' ? 'location' : 'link'}
                type="text"
                style={
                  type === 'Очная'
                    ? showErrorBorder('location')
                    : showErrorBorder('link')
                }
                placeholder={type === 'Очная' ? 'Место проведения' : 'Cсылка'}
                onChange={formik.handleChange}
                value={
                  type === 'Очная' ? formik.values.location : formik.values.link
                }
              />
              {type === 'Очная' ? showError('location') : showError('link')}
            </Form.Group>
            <Form.Group controlId="recommended_qnt_students">
              <Form.Label>Рекомендуемое кол-во студентов</Form.Label>
              <Form.Control
                name="recommended_qnt_students"
                type="number"
                style={showErrorBorder('recommended_qnt_students')}
                disabled={mode === 'edit' && method_wrote === 'по времени'}
                placeholder="Кол-во студентов"
                onChange={formik.handleChange}
                value={formik.values.recommended_qnt_students}
              />
              {showError('recommended_qnt_students')}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="note">
          <Form.Label>Примечание</Form.Label>
          <Form.Control
            placeholder="Примечание"
            value={formik.values.note}
            style={showErrorBorder('note')}
            onChange={formik.handleChange}
            as="textarea"
            rows="5"
          />
          {showError('note')}
        </Form.Group>
        <div className={s.submitWrapper}>
          <SpinnerButton
            disabled={formik.isSubmitting}
            variant="primary"
            type="submit"
          >
            {mode === 'create' && 'Создать'}
            {mode === 'edit' && 'Сохранить'}
          </SpinnerButton>
          {showFormAlert && (
            <div className="ml-5">
              <FormAlert status={status} />
            </div>
          )}
        </div>
      </Form>
    </Container>
  )
}
