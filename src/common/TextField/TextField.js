import React from 'react'

import { Form } from 'react-bootstrap'

import s from './TextField.module.css'

export const TextField = ({ name, error, onChange, value, type, label, ...rest }) => {
  const errorFieldStyle = { border: '1px solid red' }

  return (
    <Form.Group controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        style={error && errorFieldStyle}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {error && <span className={s.error}>{error}</span>}
    </Form.Group>
  )
}
