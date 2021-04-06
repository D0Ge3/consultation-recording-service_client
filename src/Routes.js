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
import { AccountActivation } from './containers/AccountActivation/AccountActivation'
import { AuthRoute } from './hoc/AuthRoute'

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
          <AuthRoute path="/cabinet" isAuth={isAuth}>
            <Cabinet />
          </AuthRoute>
          <AuthRoute path="/settings" isAuth={isAuth}>
            <Settings />
          </AuthRoute>
          <AuthRoute path="/schedule" isAuth={isAuth}>
            <Schedule />
          </AuthRoute>
          <AuthRoute path="/consultations" isAuth={isAuth}>
            <Consultations />
          </AuthRoute>
          <AuthRoute path="/consultation/create" isAuth={isAuth}>
            <ConsultationForm mode="create" />
          </AuthRoute>
          <AuthRoute path="/consultation/:id_consultation/edit" isAuth={isAuth}>
            <ConsultationForm mode="edit" />
          </AuthRoute>
          <AuthRoute
            path="/consultation/:id_consultation/visits"
            isAuth={isAuth}
          >
            <ConsultationVisits />
          </AuthRoute>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/auth/activate/:uid/:token">
            <AccountActivation />
          </Route>
          <Redirect from="/" to="/cabinet" />
        </Switch>
      )}
    </>
  )
}
