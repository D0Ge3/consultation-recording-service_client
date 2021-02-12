import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Privacy } from './containers/Privacy/Privacy'
import { Cabinet } from './containers/Cabinet/Cabinet'
import { Login } from './containers/Login/Login'
import { Schedule } from './containers/Schedule/Schedule'
import { Consultations } from './containers/Consultations/Consultations'
import { ConsultationForm } from './containers/ConsultationForm/ConsultationForm'
import { ConsultationVisits } from './containers/ConsultationVisits/ConsultationVisits'
import { Settings } from './containers/Settings/Settings'
import { Registration } from './containers/Registration/Registration'

export const Routes = ({ isInitialized, isAuth }) => {
  return (
    <>
      {isInitialized && (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          {!isAuth && <Redirect to="/login" />}
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
    </>
  )
}
