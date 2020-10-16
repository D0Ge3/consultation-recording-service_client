import React from 'react'

import { Button, Modal } from 'react-bootstrap'

export const ModalConfirm = ({
  showModal,
  handleClose,
  title,
  body,
  setAnswer,
}) => {
  const handleAnswer = (answer) => {
    setAnswer(answer)
    handleClose()
  }
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <h5 className="mb-0">{title}</h5>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleAnswer(true)}>
          Да
        </Button>
        <Button variant="secondary" onClick={() => handleAnswer(false)}>
          Нет
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
