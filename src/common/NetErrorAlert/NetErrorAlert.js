import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setError } from '../../redux/actions/appActions'

import { Toast } from 'react-bootstrap'

import s from './NetErrorAlert.module.css'

export const NetErrorAlert = ({ error }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  useEffect(() => () => dispatch(setError(null)))
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      className={s.toast}
      delay={1000}
      autohide
    >
      <Toast.Body className={s.body}>{error}</Toast.Body>
    </Toast>
  )
}
