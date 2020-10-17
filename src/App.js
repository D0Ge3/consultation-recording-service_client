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

import './App.css'

export const App = () => {
  require('moment/locale/ru.js')
  const dispatch = useDispatch()
  const isInitialized = useSelector((state) => state.app.isInitialized)
  useEffect(() => {
    dispatch(initializeApp())
  },[])

  return isInitialized ? (
    <>
      <Header />
      <Switch>
        <Route path="/cabinet">
          <Cabinet />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <span>registration</span>
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
    </>
  ) : (<p>loading...</p>)
}
