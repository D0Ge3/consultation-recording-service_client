import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConsultations, takeTicket } from '../../redux/actions/consultationsActions'

import { Container } from 'react-bootstrap'
import { ConsultationsList } from '../../ui/ConsultationList/ConsultationsList'

export const Schedule = () => {
  const dispatch = useDispatch()
  const consultations = useSelector((state) => state.consultations.consultations)
  const role = useSelector((state) => state.profile.role)
  useEffect(() => {
    dispatch(getConsultations('future'))
  }, [])
  return (
    <Container className="mt-4">
      <h5 className="text-center">Расписание консультаций</h5>
      <ConsultationsList
        consultations={consultations}
        role={role}
        takeTicket={(id_consultation) => dispatch(takeTicket(id_consultation))}
      />
    </Container>
  )
}
