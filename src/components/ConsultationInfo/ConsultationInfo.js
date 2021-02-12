import React from 'react'
import moment from 'moment'

import {
  Person,
  GeoAlt,
  InfoCircle,
  JournalCheck,
  JournalText,
  CalendarEvent,
} from 'react-bootstrap-icons'

import s from './ConsultationInfo.module.css'

export const ConsultationInfo = ({ consultation }) => {
  const {
    start_time,
    end_time,
    location,
    note,
    subjects,
    method_wrote,
    consultation_type,
    link,
  } = consultation
  let subjectsList = subjects.map((s) => (
    <p className="mb-0" key={s.teacher_subject}>
      {' '}
      {s.subject}
    </p>
  ))
  const date = moment(start_time).format('DD MMMM')
  const time_start = moment(start_time).format('HH:mm')
  const time_end = moment(end_time).format('HH:mm')

  return (
    <>
      <h5>Информация о консультации</h5>
      <div className={s.param}>
        <Person /> <span>{subjects[0].teacher_fio}</span>
      </div>
      <div className={s.subjectListWrapper}>
        <JournalText className={s.subjectIcon} />
        {subjectsList}
      </div>
      {(link || location) && (
        <div className={s.param}>
          <GeoAlt />{' '}
          {consultation_type === 'Очная' ? (
            <span>{location}</span>
          ) : (
            <a
              href={link}
              title={!link ? 'Ссылка будет доступна после записи' : ''}
            >
              Дистанционно
            </a>
          )}
        </div>
      )}
      {note && (
        <div className={s.param}>
          <InfoCircle /> <span>{note}</span>
        </div>
      )}
      <div className={s.param}>
        <JournalCheck />
        <span>
          {method_wrote === 'по времени'
            ? ` Запись ${method_wrote}`
            : ' Свободная запись'}
        </span>
      </div>
      <div className={s.param}>
        <CalendarEvent />{' '}
        <span>
          {date} {time_start} - {time_end}
        </span>
      </div>
    </>
  )
}
