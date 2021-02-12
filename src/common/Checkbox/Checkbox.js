import React from 'react'

import { Form } from 'react-bootstrap'

export const Checkbox = ({ name, onChange, value, label }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Check
        name={name}
        type="checkbox"
        label={label}
        onChange={onChange}
        value={value}
      />
    </Form.Group>
  )
}
