import React from 'react'
import moment from 'moment'

import { Alert } from 'react-bootstrap'

export const ConsultationTimeInfo = ({ time_on_one_student }) => {
  let time = moment().add(time_on_one_student, 'm')
  return (
    <Alert variant="info">
      На каждого студента будет выделено {moment().to(time, true)}
    </Alert>
  )
}
