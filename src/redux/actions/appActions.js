import { verify } from './authActions'

export const SET_INITIALIZED = 'app/SET_INITIALIZED'
export const SET_ERROR = 'app/SET_ERROR'
export const SET_IS_LOADING = 'app/SET_IS_LOADING'
export const SET_IS_SHOW_FORM_STATUS = 'app/SHOW_FORM_STATUS'

export const setInitialized = () => ({ type: SET_INITIALIZED })
export const setError = (error) => ({ type: SET_ERROR, error })
export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading })
export const setIsShowFormStatus = (isShow) => ({ type: SET_IS_SHOW_FORM_STATUS, isShow })

export const initializeApp = () => async (dispatch) => {
  dispatch(verify()).then(() => dispatch(setInitialized()))
}
