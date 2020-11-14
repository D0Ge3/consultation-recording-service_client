import React from 'react'

export const FormAlert = ({ status }) => {
  let errorMsgClass = status && status.status === 'ok' ? 'text-success' : 'text-danger'

  return status ? <b className={`${errorMsgClass}`}>{status.msg}</b> : null
}
