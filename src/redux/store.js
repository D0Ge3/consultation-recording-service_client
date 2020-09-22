import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from './reducers/authReducer'
import { appReducer } from './reducers/appReducer'
import { profileReducer } from './reducers/profileReducer'
import { consultationsReducer } from './reducers/consultationsReducer'

let reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  consultations: consultationsReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store
