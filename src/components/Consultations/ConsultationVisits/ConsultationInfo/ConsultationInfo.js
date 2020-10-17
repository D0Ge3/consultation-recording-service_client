import React from 'react'

import { Person, GeoAlt, InfoCircle, JournalCheck, JournalText } from 'react-bootstrap-icons'

import s from './ConsultationInfo.module.css'

export const ConsultationInfo = ({ consultation }) => {
  const {
    start_time,
    end_time,
    consultation_location,
    note,
    subjects,
    method_wrote
  } = consultation
  let subjectsList = subjects.map((s) => (
    <p className="mb-0" key={s.teacher_subject}> {s.subject}</p>
  ))
  const subjectWordEnd = subjects.length > 1 ? 'ы' : 'а'
  return (
    <>
      <h6>Информация о консультации</h6>
      <div className={s.param}><Person /> <span>{subjects[0].teacher_fio}</span></div>
      <div className={s.subjectListWrapper}>
        <JournalText className={s.subjectIcon}/>
        {subjectsList}
      </div>
      <div className={s.param}><GeoAlt /> <span>{consultation_location}</span></div>
      {note && <div className={s.param}><InfoCircle /> <span>{note}</span></div>}
      <div className={s.param}>
        <JournalCheck />
        <span>
          {method_wrote === 'по времени'
            ? ` Запись ${method_wrote}`
            : ' Свободная запись'}
        </span>
      </div>
    </>
  )
}