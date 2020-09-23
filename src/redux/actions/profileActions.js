import { profileAPI } from '../../api'

export const SET_USER_DATA = 'profile/SET_USER_DATA'
export const SET_SUBJECTS = 'profile/SET_SUBJECTS'

export const setUserData = (userData) => ({ type: SET_USER_DATA, userData })
export const setSubjects = (subjects) => ({ type: SET_SUBJECTS, subjects })

export const getUserData = () => async (dispatch) => {
  try {
    const res = await profileAPI.me()
    dispatch(setUserData(res.data))
    if (res.data.role === 'teacher') {
      dispatch(getSubjects())
    }
  } catch (error) {
    console.log('err')
  }
}

export const getSubjects = () => async (dispatch) => {
  try {
    const res = await profileAPI.getSubjects()
    dispatch(setSubjects(res.data.results))
  } catch (error) {
    console.log('err')
  }
}
