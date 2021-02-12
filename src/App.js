import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/appActions'

import { Privacy } from './containers/Privacy/Privacy'
import { Header } from './components/Header/Header'
import { Cabinet } from './containers/Cabinet/Cabinet'
import { Login } from './containers/Login/Login'
import { Schedule } from './containers/Schedule/Schedule'
import { Consultations } from './containers/Consultations/Consultations'
import { ConsultationForm } from './containers/ConsultationForm/ConsultationForm'
import { ConsultationVisits } from './containers/ConsultationVisits/ConsultationVisits'
import { Settings } from './containers/Settings/Settings'
import { Registration } from './containers/Registration/Registration'
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
      {isInitialized && (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {!isAuth && <Redirect to="/login" />}
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
