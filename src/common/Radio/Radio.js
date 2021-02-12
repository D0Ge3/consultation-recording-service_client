import React from 'react'

import { Form } from 'react-bootstrap'

export const Radio = ({ name, onChange, value, options = [], label, labelStyle, style, disabledGroup }) => {
  const radioOptions = options.map((o) => (
    <Form.Check
      key={o.id}
      id={o.id}
      name={name}
      type="radio"
      label={o.label}
      value={o.value}
      onChange={onChange}
      checked={value === o.value}
      disabled={disabledGroup}
    />
  ))
  return (
    <Form.Group controlId={name} style={style}>
      <Form.Label>
        <span style={labelStyle}>{label}</span>
      </Form.Label>
      {radioOptions}
    </Form.Group>
  )
}
