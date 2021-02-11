import * as actionTypes from '../actions/appActions'

const initialState = {
  isInitialized: false,
  error: null,
  isShowFormStatus: false,
  isLoading: false,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIALIZED:
      return { ...state, isInitialized: true }
    case actionTypes.SET_ERROR:
      return { ...state, error: action.error }
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case actionTypes.SET_IS_SHOW_FORM_STATUS:
      return { ...state, isShowFormStatus: action.isShow }
    default:
      return state
  }
}
