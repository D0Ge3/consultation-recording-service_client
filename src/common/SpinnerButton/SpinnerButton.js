import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export const SpinnerButton = ({ disabled, children, ...rest }) => {
  return (
    <Button disabled={disabled} {...rest}>
      {disabled && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-2"
        />
      )}
      <span>{children}</span>
    </Button>
  )
}
