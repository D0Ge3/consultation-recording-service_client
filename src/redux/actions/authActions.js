import { authAPI } from '../../api'
import { instance } from '../../api/axiosInstance'
import { getUserData } from './profileActions'

export const SET_AUTH = 'auth/SET_AUTH'

export const setAuth = (isAuth) => ({ type: SET_AUTH, isAuth })

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
