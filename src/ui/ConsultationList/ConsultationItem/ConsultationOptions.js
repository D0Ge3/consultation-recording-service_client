import React, { useState } from 'react'

import { Button } from 'react-bootstrap'
import { PencilSquare, XCircle } from 'react-bootstrap-icons'
import { ModalSelectTime } from './ModalSelectTime/ModalSelectTime'

import s from './ConsultationItem.module.css'

export const ConsultationOptions = ({
  edit,
  role,
  type,
  is_ticket,
  id_consultation,
  count_ticketed,
  recommended_number_students,
  takeTicket,
  is_visit,
  deleteItem,
  method_wrote,
}) => {
  const [showModal, setShowModal] = useState(false)

  const onTicket = (id_consultation) => {
    if (method_wrote === 'по времени') {
      setShowModal(true)
    } else {
      takeTicket(id_consultation)
    }
  }

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
        <>
          <Button
            size="sm"
            variant="success"
            onClick={() => onTicket(id_consultation)}
            disabled={is_ticket}
          >
            Записаться
          </Button>
          <ModalSelectTime
            handleClose={() => setShowModal(false)}
            id_consultation={id_consultation}
            showModal={showModal}
          />
        </>
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
        <Button
          onClick={() => edit(id_consultation)}
          size="sm"
          className="mr-2"
          variant="outline-dark"
        >
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
