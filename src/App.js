import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeApp } from './redux/actions/appActions'

import { Header } from './components/Header/Header'

import { Routes } from './Routes'
import { Loader } from './common/Loader/Loader'
import { Container } from 'react-bootstrap'
import { NetErrorAlert } from './common/NetErrorAlert/NetErrorAlert'

import './App.css'

export const App = () => {
  require('moment/locale/ru.js')
  const dispatch = useDispatch()
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const error = useSelector((state) => state.app.error)
  const isAuth = useSelector((state) => state.auth.isAuth)
  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <>
      <Header />
      <Routes isAuth={isAuth} isInitialized={isInitialized} />
      {!isInitialized && (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      )}
      {error && <NetErrorAlert error={error} />}
    </>
  )
}
