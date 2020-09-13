import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/appActions'

import { Privacy } from './components/Privacy/Privacy'
import { Header } from './components/Header/Header'
import { Cabinet } from './components/Cabinet/Cabinet'
import { Login } from './components/Login/Login'

import './App.css'

export const App = () => {
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
        <Route path="/privacy">
          <Privacy />
        </Route>
        <Redirect from="/" to="/cabinet" />
      </Switch>
    </>
  )
}
