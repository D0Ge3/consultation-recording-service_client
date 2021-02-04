import * as actionTypes from '../actions/authActions'

const initialState = {
  isAuth: false,
  registrationStatus: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return { ...state, isAuth: action.isAuth }
    default:
      return state
  }
}
