import React from 'react'
import { Spinner } from 'react-bootstrap'


export const Loader = () => {
  return (
    <Spinner
      style={{ width: '150px', height: '150px' }}
      variant="primary"
      animation="border"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}
