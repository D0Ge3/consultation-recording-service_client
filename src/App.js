import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/appActions'

import { Privacy } from './components/Privacy/Privacy'
import { Header } from './components/Header/Header'
import { Cabinet } from './components/Cabinet/Cabinet'
import { Login } from './components/Login/Login'
import { Schedule } from './components/Schedule/Schedule'
import { Consultations } from './components/Consultations/Consultations'
import { ConsultationForm } from './components/Cabinet/ConsultationsWidget/ConsultationForm/ConsultationForm'
import { ConsultationVisits } from './components/Consultations/ConsultationVisits/ConsultationVisits'
import { Settings } from './components/Settings/Settings'
import { Registration } from './components/Registration/Registration'
import { Loader } from './ui/Loader/Loader'
import { Container } from 'react-bootstrap'
import { NetErrorAlert } from './ui/NetErrorAlert/NetErrorAlert'

import './App.css'

export const App = () => {
  require('moment/locale/ru.js')
  const dispatch = useDispatch()
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const error = useSelector((state) => state.app.error)
  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <>
      <Header />
      {isInitialized && (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/cabinet">
            <Cabinet />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/consultations">
            <Consultations />
          </Route>
          <Route path="/consultation/create">
            <ConsultationForm mode="create" />
          </Route>
          <Route path="/consultation/:id_consultation/edit">
            <ConsultationForm mode="edit" />
          </Route>
          <Route path="/consultation/:id_consultation/visits">
            <ConsultationVisits />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Redirect from="/" to="/cabinet" />
        </Switch>
      )}
      {!isInitialized && (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      )}
      {error && <NetErrorAlert error={error} />}
    </>
  )
}
