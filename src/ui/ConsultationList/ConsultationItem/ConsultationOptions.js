import React from 'react'

import { Button } from 'react-bootstrap'
import { PencilSquare, XCircle } from 'react-bootstrap-icons'

import s from './ConsultationItem.module.css'

export const ConsultationOptions = ({
  role,
  type,
  is_ticket,
  id_consultation,
  count_ticketed,
  recommended_number_students,
  takeTicket,
  is_visit,
  deleteItem,
}) => {
  return (
    <div>
      {type === 'widget' && role === 'teacher' && (
        <span className={s.count}>
          {count_ticketed}/{recommended_number_students}
        </span>
      )}
      {(type === 'schedule' || type === 'info') && (
        <span className={s.count}>
          {count_ticketed}/{recommended_number_students}
        </span>
      )}
      {role === 'student' && type === 'schedule' && (
        <Button
          size="sm"
          variant="success"
          onClick={() => takeTicket(id_consultation)}
          disabled={is_ticket}
        >
          Записаться
        </Button>
      )}
      {role === 'student' && type === 'info' && (
        <span className={s.isVisit}>
          Присутствие:{' '}
          {is_visit ? (
            <span className="text-success">Да</span>
          ) : (
            <span className="text-danger">Нет</span>
          )}
        </span>
      )}
      {role === 'teacher' && type === 'info' && (
        <Button size="sm" variant="success">
          Подробнее...
        </Button>
      )}
      {type === 'widget' && role === 'teacher' && (
        <Button size="sm" className="mr-2" variant="outline-dark">
          <PencilSquare />
        </Button>
      )}
      {type === 'widget' && (
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => deleteItem(id_consultation)}
        >
          <XCircle />
        </Button>
      )}
    </div>
  )
}
