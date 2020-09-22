import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../../../redux/actions/profileActions'

import s from './UserProfile.module.css'

export const UserProfile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  let subjectsList = profile.subjects.map((s) => (
    <li key={s.teacher_subject}>{s.subject}</li>
  ))

  return (
    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5">
      <h4>
        {profile.last_name} {profile.first_name} {profile.middle_name}
      </h4>
      <p className="mb-0">Табельный номер: {profile.employee_number}</p>
      <p className="mb-0">Эл. почта: {profile.email}</p>
      <p className="mb-0">
        {profile.role === 'student'
          ? `Группа: ${profile.group_number}`
          : 'Дисциплины:'}
      </p>
      {profile.role === 'teacher' && (
        <ul className={s.subjectList}>{subjectsList}</ul>
      )}
    </div>
  )
}
