import * as actionTypes from '../actions/appActions'

const initialState = {
  isInitialized: false,
  error: null,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIALIZED:
      return { ...state, isInitialized: true }
    case actionTypes.SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}