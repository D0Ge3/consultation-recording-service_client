import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setIsShowFormStatus } from '../../redux/actions/appActions'

export const FormAlert = ({ status }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    let timer = setTimeout(() => dispatch(setIsShowFormStatus(false)), 3000)
    return () => {
      clearTimeout(timer)
      dispatch(setIsShowFormStatus(false))
    }
  })
  let errorMsgClass = status && status.status === 'ok' ? 'text-success' : 'text-danger'

  return status ? <span className={`${errorMsgClass}`}>{status.msg}</span> : null
}
