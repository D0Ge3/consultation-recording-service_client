import React from 'react'

import { ListGroup } from 'react-bootstrap'
import { ConsultationItem } from './ConsultationItem/ConsultationItem'

export const ConsultationsList = ({ type = 'schedule', role, consultations, takeTicket }) => {
  const items = consultations.map((c) => (
    <ConsultationItem key={c.id_consultation} consultation={c} role={role} />
  ))
  return <ListGroup>{items}</ListGroup>
}
