import React from 'react'

import { Button } from 'react-bootstrap'

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
}) => {
  return (
    <div>
      <span className={s.count}>
        {count_ticketed}/{recommended_number_students}
      </span>
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
    </div>
  )
}