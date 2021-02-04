import * as actionTypes from '../actions/registrationActions'

const initialState = {
  registrationStatus: null,
  groups: [],
}

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_STATUS:
      return { ...state, registrationStatus: action.status }
    case actionTypes.SET_GROUPS:
      return { ...state, groups: action.groups }
    default:
      return state
  }
}
