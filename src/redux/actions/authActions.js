import { authAPI } from '../../api'
import { instance } from '../../api/axiosInstance'

export const SET_AUTH = 'app/SET_AUTH'

export const setAuth = (isAuth) => ({ type: SET_AUTH, isAuth })

export const login = (email, password, rememberMe = false) => async (dispatch) => {
  const res = await authAPI.getToken(email, password)
  if (res.status === 200) {
    if (rememberMe) {
      localStorage.setItem('access', res.data.access)
      instance.defaults.headers.Authorization = `JWT ${localStorage.getItem('access')}`
    } else {
      sessionStorage.setItem('access', res.data.access)
      instance.defaults.headers.Authorization = `JWT ${sessionStorage.getItem('access')}`
    }
  }
  dispatch(verify())
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
    const res = await authAPI.verifyToken(token)
    dispatch(setAuth(true))
  } catch (error) {
    // if (error.status === )
  }
}