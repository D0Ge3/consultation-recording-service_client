import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getFreeTimes, setFreeTimes, takeTicket } from '../../redux/actions/consultationsActions'

import { Modal, Button } from 'react-bootstrap'

import s from './ModalSelectTime.module.css'

export const ModalSelectTime = ({ showModal, handleClose, id_consultation }) => {
  const dispatch = useDispatch()
  const freeTimes = useSelector((state) => state.consultations.freeTimes)
  useEffect(() => {
    if (showModal) {
      dispatch(getFreeTimes(id_consultation))
    }
  }, [showModal])
  const onClose = () => {
    handleClose()
    dispatch(setFreeTimes([]))
  }
  const takeTicketOnTime = (id_consultation, time) => {
    dispatch(takeTicket(id_consultation, { time })).then(() => handleClose())
  }
  const timeBtns = freeTimes.map((t) => (
    <Button
      className="m-2"
      size="md"
      onClick={() => takeTicketOnTime(id_consultation, t.id_time)}
      key={t.id_time}
      variant="outline-primary"
    >
      {t.time}
    </Button>
  ))
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton={onClose}>
        <h5 className="mb-0">Выберите время</h5>
      </Modal.Header>
      <Modal.Body>
        <div className={s.timeBtnWrapper}>{timeBtns}</div>
      </Modal.Body>
    </Modal>
  )
}
