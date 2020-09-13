import { authAPI } from '../../api/auth'

export const SET_USER_DATA = 'profile/SET_USER_DATA'

export const setUserData = (userData) => ({ type: SET_USER_DATA, userData })

export const getUserData = () => async (dispatch) => {
  try {
    const res = await authAPI.me()
    dispatch(setUserData(res.data))
  } catch (error) {
    console.log('err')
  }
}