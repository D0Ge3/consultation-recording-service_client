import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData } from '../../../redux/actions/profileActions'

export const UserProfile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  return (
    <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5">
      <h4>
        {profile.last_name} {profile.first_name} {profile.middle_name}
      </h4>
      <p className="mb-0">Табельный номер: {profile.employee_number}</p>
      <p className="mb-0">Эл. почта: {profile.email}</p>
      <p>
        {profile.role === 'student'
          ? `Группа: ${profile.group_number}`
          : 'Дисциплины:'}
      </p>
    </div>
  )
}
