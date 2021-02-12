import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { PencilSquare, XCircle } from 'react-bootstrap-icons'
import { ModalSelectTime } from './ModalSelectTime/ModalSelectTime'
import { ModalConfirm } from './ModalConfirm/ModalConfirm'

import s from './ConsultationItem.module.css'

export const ConsultationOptions = ({
  edit,
  role,
  type,
  is_ticket,
  id_consultation,
  count_ticketed,
  recommended_qnt_students,
  takeTicket,
  is_visit,
  deleteItem,
  method_wrote,
}) => {
  const history = useHistory()
  const [showSelectModal, setShowSelectModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onTicket = (id_consultation) => {
    if (method_wrote === 'по времени') {
      setShowSelectModal(true)
    } else {
      takeTicket(id_consultation)
    }
  }

  return (
    <div>
      {type === 'widget' && role === 'teacher' && (
        <span className={s.count}>
          {count_ticketed}/{recommended_qnt_students}
        </span>
      )}
      {(type === 'schedule' || type === 'info') && (
        <span className={s.count}>
          {count_ticketed}/{recommended_qnt_students}
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
            handleClose={() => setShowSelectModal(false)}
            id_consultation={id_consultation}
            showModal={showSelectModal}
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
        <Button
          size="sm"
          variant="success"
          onClick={() => history.push(`consultation/${id_consultation}/visits`)}
        >
          Посещения
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
        <>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            <XCircle />
          </Button>
          <ModalConfirm
            title={role === 'teacher' ? 'Удаление консультации' : 'Отмена записи'}
            body={
              role === 'teacher'
                ? 'Вы уверены что хотите удалить консультацию?'
                : 'Вы уверены что хотите отменить запись на консультацию?'
            }
            setAnswer={(answer) => answer && deleteItem(id_consultation)}
            showModal={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
          />
        </>
      )}
    </div>
  )
}
