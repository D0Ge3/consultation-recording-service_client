import React from 'react'

import { ListGroup, Row } from 'react-bootstrap'
import { ConsultationDate } from './ConsultationDate/ConsultationDate'
import { ConsultationParams } from './ConsultationParams/ConsultationParams'
import { ConsultationOptions } from './ConsultationOptions/ConsultationOptions'

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
    consultation_type,
    link,
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
          consultation_type={consultation_type}
          location={location}
          link={link}
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
