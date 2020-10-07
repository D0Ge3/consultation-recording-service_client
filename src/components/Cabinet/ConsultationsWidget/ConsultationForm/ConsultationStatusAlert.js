import React from 'react'

export const ConsultationStatusAlert = ({ status }) => {
  let errorMsgClass = status && status.status === 'ok' ? 'text-success' : 'text-danger'

  return status ? <b className={`${errorMsgClass} ml-5`}>{status.msg}</b> : null
}