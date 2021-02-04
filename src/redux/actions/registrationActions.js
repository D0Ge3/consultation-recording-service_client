import { registrationAPI } from '../../api'

export const SET_REGISTRATION_STATUS = 'registration/SET_REGISTRATION_STATUS'
export const SET_GROUPS = 'registration/SET_GROUPS'

export const setGroups = (groups) => ({ type: SET_GROUPS, groups })
export const setRegistrationStatus = (status) => ({ type: SET_REGISTRATION_STATUS, status })

export const register = (regData) => async (dispatch) => {
  const res = await registrationAPI.register(regData)
  if (res.status === 201) {
    dispatch(setRegistrationStatus('OK'))
  }
  return res
}

export const getGroups = () => async (dispatch) => {
  const res = await registrationAPI.getGroups()
  dispatch(setGroups(res.data))
}
