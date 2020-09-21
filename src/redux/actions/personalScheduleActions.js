import { scheduleAPI } from '../../api'

export const SET_USERSCHEDULE = 'personalSchedule/SET_USERSCHEDULE'

export const setUserSchedule = (consultations) => ({ type: SET_USERSCHEDULE, consultations })

export const getUserSchedule = () => async (dispatch) => {
  try {
    const res = await scheduleAPI.getUserSchedule()
    dispatch(setUserSchedule(res.data))
  } catch (error) {
    console.log('err')
  }
}
