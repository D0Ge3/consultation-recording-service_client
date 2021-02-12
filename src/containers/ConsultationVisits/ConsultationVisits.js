import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  getConsultation,
  setSelectedConsultation,
} from '../../redux/actions/consultationsActions'
import { getVisits, setVisits } from '../../redux/actions/visitsActions'

import { Container } from 'react-bootstrap'
import { ConsultationInfo } from '../../components/ConsultationInfo/ConsultationInfo'
import { Loader } from '../../common/Loader/Loader'

import { VisitsTable } from '../../components/VisitsTable/VisitsTable'

export const ConsultationVisits = () => {
  const dispatch = useDispatch()
  const consultation = useSelector(
    (state) => state.consultations.selectedConsultation
  )
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

  return (
    <>
      {consultation ? (
        <Container className="mt-4">
          <h5 className="text-center">Посещения</h5>
          <ConsultationInfo consultation={consultation} />
          <VisitsTable
            method_wrote={consultation.method_wrote}
            visits={visits}
          />
        </Container>
      ) : (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      )}
    </>
  )
}
