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
}) => {
  return (
    <div>
      <span className={s.count}>
        {count_ticketed}/{recommended_number_students}
      </span>
      {role === 'student' && (
        <Button size="sm" variant="success" disabled={is_ticket}>
          Записаться
        </Button>
      )}
      {role === 'teacher' && type === 'visits' && (
        <Button size="sm" variant="success">
          Подробнее...
        </Button>
      )}
    </div>
  )
}