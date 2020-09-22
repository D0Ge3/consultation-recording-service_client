import React from 'react'

import { ListGroup, Row } from 'react-bootstrap'
import { ConsultationDate } from './ConsultationDate'
import { ConsultationParams } from './ConsultationParams'
import { ConsultationOptions } from './ConsultationOptions'

export const ConsultationItem = ({ consultation, type = 'schedule', role, takeTicket }) => {
  const {
    id_consultation,
    count_ticketed,
    end_time,
    start_time,
    is_ticket,
    recommended_number_students,
    note,
    consultation_location,
    method_wrote,
    teacher_subject,
  } = consultation

  return (
    <ListGroup.Item>
      <Row className="ml-3">
        <ConsultationDate start_time={start_time} end_time={end_time} />
        <ConsultationParams
          teacher_subject={teacher_subject}
          note={note}
          consultation_location={consultation_location}
        />
        <ConsultationOptions
          count_ticketed={count_ticketed}
          recommended_number_students={recommended_number_students}
          id_consultation={id_consultation}
          role={role}
          type={type}
          is_ticket={is_ticket}
        />
      </Row>
    </ListGroup.Item>
  )
}
