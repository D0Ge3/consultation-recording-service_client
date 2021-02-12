import React from 'react'

import { Form } from 'react-bootstrap'

import s from './Select.module.css'

export const Select = ({ name, placeholder, value, onChange, error, options = [], ...rest }) => {
  const errorFieldStyle = { border: '1px solid red' }

  const selectOptions = options.map((o) => <option key={o}>{o}</option>)

  return (
    <Form.Group controlId={name}>
      <Form.Control
        as="select"
        style={error && errorFieldStyle}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        custom
        {...rest}
      >
        <option disabled value={''} key={''}>
          {placeholder}
        </option>
        {selectOptions}
      </Form.Control>
      {error && <span className={s.error}>{error}</span>}
    </Form.Group>
  )
}
