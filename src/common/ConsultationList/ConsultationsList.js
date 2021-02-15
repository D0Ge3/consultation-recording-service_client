import React from 'react'

import { ListGroup } from 'react-bootstrap'
import { ConsultationItem } from '../ConsultationItem/ConsultationItem'

export const ConsultationsList = ({ type = 'schedule', role, consultations, takeTicket, deleteItem, edit }) => {
  const items = consultations.map((c) => (
    <ConsultationItem
      edit={edit}
      deleteItem={deleteItem}
      type={type}
      key={c.id_consultation}
      consultation={c}
      role={role}
      takeTicket={takeTicket}
    />
  ))
  return consultations.length > 0 ? (
    <ListGroup>{items}</ListGroup>
  ) : (
    <div className="text-center">
      <span className="text-secondary">Нет консультаций</span>
    </div>
  )
}
