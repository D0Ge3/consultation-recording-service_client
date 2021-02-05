import React, { useState } from 'react'

import {
  GeoAlt,
  InfoCircle,
  JournalText,
  PersonFill,
} from 'react-bootstrap-icons'

import s from './ConsultationItem.module.css'

export const ConsultationParams = ({
  subjects,
  note,
  location,
  type,
  role,
  consultation_type,
  link,
}) => {
  let [showNote, setShowNote] = useState(false)
  const paramStyle = type === 'widget' ? { width: '300px' } : {}
  const subjectsList = subjects.map((s) => (
    <span key={s.teacher_subject}>{s.subject}</span>
  ))
  const { teacher_fio } = subjects[0]

  return (
    <div className={s.params} style={paramStyle}>
      {(type === 'widget' && role === 'student') ||
        ((type === 'schedule' || type === 'info') && (
          <div className={s.teacherWrapper}>
            <PersonFill className={s.teacherIcon} />
            <span className={s.teacherName}>{teacher_fio}</span>
          </div>
        ))}
      <div className={s.subjectListWrapper}>
        <JournalText className={s.subjectIcon} />
        {subjectsList}
      </div>
      {note.length > 50 && !showNote ? (
        <div className={s.noteWrapper}>
          <InfoCircle className={s.noteIcon} />
          <span className={s.noteBtn} onClick={() => setShowNote(true)}>
            Показать примечание...
          </span>
        </div>
      ) : (
        note && (
          <div className={s.noteWrapper}>
            <InfoCircle className={s.noteIcon} />
            <span className={s.note}>{note}</span>
          </div>
        )
      )}
      {(location || link) && (
        <div className={s.location}>
          <GeoAlt className={s.locationIcon} />
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
    </div>
  )
}
