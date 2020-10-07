import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import {
  createConsultation,
  getConsultation,
  setSelectedConsultation,
  updateConsultation,
} from '../../../../redux/actions/consultationsActions'

import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown'
import Datetime from 'react-datetime'
import { ConsultationStatusAlert } from './ConsultationStatusAlert'

import s from './ConsultationForm.module.css'
import 'react-datetime/css/react-datetime.css'

export const ConsultationForm = ({ mode }) => {
  let { id_consultation } = useParams()
  const [status, setStatus] = useState(null)

  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.profile.subjects)
  const selectedConsultation = useSelector((state) => state.consultations.selectedConsultation)

  const formik = useFormik({
    initialValues: {
      start_time: '',
      end_time: '',
      recommended_number_students: '',
      note: '',
      method_wrote: 'свободный', //временно
      time_on_one_student: null,
      consultation_location: '',
      teacher_subject: [],
    },
    onSubmit: (values) => {
      setStatus(null)
      if (mode === 'create') {
        dispatch(createConsultation(values, formik))
      } else if (mode === 'edit') {
        dispatch(updateConsultation(values, formik))
      }
    },
  })

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
                options={subjects}
                placeholder="Выберите дисциплины"
                selectedValues={formik.values.teacher_subject}
                onSelect={(v) => formik.setFieldValue('teacher_subject', v)}
                onRemove={(v) => formik.setFieldValue('teacher_subject', v)}
                emptyRecordMsg="Нет дисциплин"
                displayValue="subject"
                style={{ searchBox: { padding: '.375rem .75rem' } }}
              />
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
                inputProps={{ placeholder: 'дд.мм.гггг чч:мм' }}
                locale="ru"
                isValidDate={isFuture}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="end_time">
              <Form.Label>Конец</Form.Label>
              <Datetime
                value={formik.values.end_time}
                onChange={(v) => formik.setFieldValue('end_time', v)}
                inputProps={{ placeholder: 'чч:мм' }}
                locale="ru"
                dateFormat={false}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="consultation_location">
              <Form.Label>Место проведения</Form.Label>
              <Form.Control
                name="consultation_location"
                type="text"
                placeholder="Место проведения или ссылка"
                onChange={formik.handleChange}
                value={formik.values.consultation_location}
              />
            </Form.Group>
            <Form.Group controlId="recommended_number_students">
              <Form.Label>Рекомендуемое кол-во студентов</Form.Label>
              <Form.Control
                name="recommended_number_students"
                type="number"
                placeholder="Кол-во студентов"
                onChange={formik.handleChange}
                value={formik.values.recommended_number_students}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="method_wrote">
              <Form.Label>Тип записи</Form.Label>
              <Form.Check
                id="свободный"
                name="method_wrote"
                type="radio"
                label="Свободный"
                value="свободный"
                onChange={formik.handleChange}
                checked={formik.values.method_wrote === 'свободный'}
              />
              <Form.Check
                id="по времени"
                name="method_wrote"
                type="radio"
                label="По времени"
                value="по времени"
                disabled //временно
                onChange={formik.handleChange}
                checked={formik.values.method_wrote === 'по времени'}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="note">
          <Form.Label>Примечание</Form.Label>
          <Form.Control
            placeholder="Примечание"
            value={formik.values.note}
            onChange={formik.handleChange}
            as="textarea"
            rows="5"
          />
        </Form.Group>

        <Button
          disabled={formik.isSubmitting && !status}
          variant="primary"
          type="submit"
        >
          {mode === 'create' && 'Создать'}
          {mode === 'edit' && 'Сохранить'}
        </Button>
        <ConsultationStatusAlert status={status} />
      </Form>
    </Container>
  )
}
