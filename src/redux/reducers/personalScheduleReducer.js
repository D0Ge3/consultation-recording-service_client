import * as actionTypes from '../actions/personalScheduleActions'

const initialState = {
  consultations: [],
}

export const personalScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERSCHEDULE:
      return { ...state, consultations: action.consultations }
    default:
      return state
  }
}
