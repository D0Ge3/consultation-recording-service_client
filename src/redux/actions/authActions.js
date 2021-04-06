import { authAPI } from '../../api'
import { instance } from '../../api/axiosInstance'
import { getUserData } from './profileActions'

export const SET_AUTH = 'auth/SET_AUTH'
export const SET_ACCOUNT_IS_ACTIVATE = 'auth/SET_ACCOUNT_IS_ACTIVATE'
export const SET_IS_LOADING = 'auth/SET_IS_LOADING'

export const setAuth = (isAuth) => ({ type: SET_AUTH, isAuth })
export const setAccountIsActivate = (isActivate) => ({
  type: SET_ACCOUNT_IS_ACTIVATE,
  isActivate,
})
export const setIsLoading = (isLoading) => ({ type: SET_IS_LOADING, isLoading })

export const login = (email, password) => async (dispatch) => {
  const res = await authAPI.getToken(email, password)
  if (res.status === 200) {
    localStorage.setItem('access', res.data.access)
    instance.defaults.headers.Authorization = `JWT ${localStorage.getItem('access')}`
  }
  dispatch(verify())
  return res
}
export const logout = () => async (dispatch) => {
  localStorage.clear()
  sessionStorage.clear()
  instance.defaults.headers.Authorization = null
  dispatch(setAuth(false))
}

export const verify = () => async (dispatch) => {
  const token = localStorage.getItem('access')
    ? localStorage.getItem('access')
    : sessionStorage.getItem('access')
  try {
    await authAPI.verifyToken(token)
    return dispatch(getUserData()).then(() => dispatch(setAuth(true)))
  } catch (error) {
    // d
  }
}

export const activateAccount = (uid, token) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true))
    await authAPI.activateAccount(uid, token)
    dispatch(setAccountIsActivate(true))
    dispatch(setIsLoading(false))
  } catch (error) {
    dispatch(setAccountIsActivate(false))
    dispatch(setIsLoading(false))
  }
}
