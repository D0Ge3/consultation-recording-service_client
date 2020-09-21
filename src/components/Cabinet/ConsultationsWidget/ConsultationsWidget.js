import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getUserSchedule } from '../../../redux/actions/personalScheduleActions'

export const ConsultationsWidget = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserSchedule())
  }, [])
  return <p>ConsultationsWidget</p>
}
