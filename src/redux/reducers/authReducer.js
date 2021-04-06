import * as actionTypes from '../actions/authActions'

const initialState = {
  isAuth: false,
  registrationStatus: null,
  isActivateAccount: null,
  isLoading: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return { ...state, isAuth: action.isAuth }
    case actionTypes.SET_ACCOUNT_IS_ACTIVATE:
      return { ...state, isActivateAccount: action.isActivate }
    default:
      return state
  }
}
