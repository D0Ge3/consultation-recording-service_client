import React from 'react'
import moment from 'moment'

import s from './ConsultationItem.module.css'

export const ConsultationDate = ({ start_time, end_time }) => {
  const date = moment(start_time).format('dd, MMMM DD')
  const time_start = moment(start_time).format('HH:mm')
  const time_end = moment(end_time).format('HH:mm')

  return (
    <div className={s.dateTime}>
      <span className={s.date}>{date}</span>
      <span className={s.time}>{time_start} - {time_end}</span>
    </div>
  )
}
