import React from 'react'

import { ListGroup, Row, Button } from 'react-bootstrap'
import { ConsultationDate } from './ConsultationDate'
import { ConsultationParams } from './ConsultationParams'
import { ConsultationOptions } from './ConsultationOptions'

export const ConsultationItem = ({ consultation, type = 'schedule', role, takeTicket, deleteItem, edit }) => {
  const {
    id_consultation,
    count_ticketed,
    end_time,
    start_time,
    is_ticket,
    recommended_qnt_students,
    note,
    location,
    method_wrote,
    subjects,
    is_visit,
    time,
  } = consultation

  return (
    <ListGroup.Item>
      <Row className="ml-3">
        <ConsultationDate
          ticket_time={time}
          start_time={start_time}
          end_time={end_time}
        />
        <ConsultationParams
          role={role}
          type={type}
          subjects={subjects}
          note={note}
          location={location}
        />
        <ConsultationOptions
          edit={edit}
          deleteItem={deleteItem}
          count_ticketed={count_ticketed}
          recommended_qnt_students={recommended_qnt_students}
          id_consultation={id_consultation}
          role={role}
          type={type}
          is_ticket={is_ticket}
          takeTicket={takeTicket}
          is_visit={is_visit}
          method_wrote={method_wrote}
        />
      </Row>
    </ListGroup.Item>
  )
}
