import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'
import { ConsultationInfo } from './ConsultationInfo/ConsultationInfo'

import {
  getConsultation,
  setSelectedConsultation,
} from '../../../redux/actions/consultationsActions'
import { getVisits, setVisits } from '../../../redux/actions/visitsActions'

import { VisitsTable } from './VisitsTable/VisitsTable'

export const ConsultationVisits = () => {
  const dispatch = useDispatch()
  const consultation = useSelector((state) => state.consultations.selectedConsultation)
  const visits = useSelector((state) => state.visits.visits)
  const { id_consultation } = useParams()
  useEffect(() => {
    dispatch(getConsultation(id_consultation))
    dispatch(getVisits(id_consultation))
    return () => {
      dispatch(setSelectedConsultation(null))
      dispatch(setVisits([]))
    }
  }, [])

  if (consultation) {
    return (
      <Container className="mt-4">
        <h5 className="text-center">Посещения</h5>
        <ConsultationInfo consultation={consultation} />
        <VisitsTable method_wrote={consultation.method_wrote} visits={visits} />
      </Container>
    )
  }
  return <p>loading...</p>
}
