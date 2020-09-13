import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Cabinet = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  return isAuth ? <span>cabinet</span> : <Redirect to="/login" />
}
