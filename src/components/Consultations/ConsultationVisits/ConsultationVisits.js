import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ConsultationDate } from '../../../ui/ConsultationList/ConsultationItem/ConsultationDate'
import { ConsultationParams } from '../../../ui/ConsultationList/ConsultationItem/ConsultationParams'
import { Container, Row, Col } from 'react-bootstrap'
import { ConsultationInfo } from './ConsultationInfo/ConsultationInfo'

import {
  getConsultation,
  setSelectedConsultation,
} from '../../../redux/actions/consultationsActions'

export const ConsultationVisits = () => {
  const dispatch = useDispatch()
  const consultation = useSelector((state) => state.consultations.selectedConsultation)
  const { id_consultation } = useParams()
  useEffect(() => {
    dispatch(getConsultation(id_consultation))
    return () => dispatch(setSelectedConsultation(null))
  }, [])

  if (consultation) {
    return (
      <Container className="mt-4">
        <h5 className="text-center">Посещения</h5>
        <ConsultationInfo consultation={consultation} />
      </Container>
    )
  }
  return <p>loading...</p>
}
