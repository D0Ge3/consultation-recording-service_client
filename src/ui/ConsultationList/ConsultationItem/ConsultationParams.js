import React, { useState } from 'react'

import { SignpostSplit } from 'react-bootstrap-icons'

import s from './ConsultationItem.module.css'

export const ConsultationParams = ({ subjects, note, consultation_location, type, role }) => {
  let [showNote, setShowNote] = useState(false)
  const subjectNameStyle = type !== 'widget' || role === 'student' ? 'ml-2' : ''
  const paramStyle = type === 'widget' ? { width: '300px' } : {}
  const subjectsList = subjects.map((s) => (
    <span className={subjectNameStyle} key={s.teacher_subject}>{s.subject}</span>
  ))
  const { teacher_fio } = subjects[0]

  return (
    <div className={s.params} style={paramStyle}>
      {type === 'widget' && role === 'student' && <span className={s.teacherName}>{teacher_fio}</span>}
      {type === 'schedule' && <span className={s.teacherName}>{teacher_fio}</span>}
      {type === 'info' && <span className={s.teacherName}>{teacher_fio}</span>}
      {subjectsList}
      {note.length > 50 && !showNote ? (
        <span className={s.noteBtn} onClick={() => setShowNote(true)}>
          Показать примечание...
        </span>
      ) : (
        <span className={s.note}>{note}</span>
      )}
      <div className={s.location}>
        <SignpostSplit className={s.locationIcon} />
        <span>{consultation_location}</span>
      </div>
    </div>
  )
}
