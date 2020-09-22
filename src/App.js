import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/appActions'

import { Privacy } from './components/Privacy/Privacy'
import { Header } from './components/Header/Header'
import { Cabinet } from './components/Cabinet/Cabinet'
import { Login } from './components/Login/Login'
import { Schedule } from './components/Schedule/Schedule'

import './App.css'

export const App = () => {
  require('moment/locale/ru.js')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeApp())
  },[])

  return (
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
        <Route path="/privacy">
          <Privacy />
        </Route>
        <Redirect from="/" to="/cabinet" />
      </Switch>
    </>
  )
}
