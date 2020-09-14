import * as actionTypes from '../actions/profileActions'

const initialState = {
  id: null,
  employee_number: null,
  first_name: '',
  last_name: '',
  middle_name: '',
  tel: '',
  role: '',
  group_number: '',
  email: '',
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return { ...state, ...action.userData }
    default:
      return state
  }
}