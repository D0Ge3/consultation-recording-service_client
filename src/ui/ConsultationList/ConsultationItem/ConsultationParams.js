import React, { useState } from 'react'

import { SignpostSplit } from 'react-bootstrap-icons'

import s from './ConsultationItem.module.css'

export const ConsultationParams = ({ teacher_subject, note, consultation_location }) => {
  let [showNote, setShowNote] = useState(false)
  const subjects = teacher_subject.map((s) => (
    <span className="ml-2" key={s.teacher_subject}>{s.subject}</span>
  ))
  const { teacher_fio } = teacher_subject[0]

  return (
    <div className={s.params}>
      <span className={s.teacherName}>{teacher_fio}</span>
      {subjects}
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