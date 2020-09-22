import * as actionTypes from '../actions/consultationsActions'

const initialState = {
  consultations: [],
  count: null,
}

export const consultationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONSULTATIONS:
      return { ...state, consultations: action.consultations }
    case actionTypes.SET_COUNT:
      return { ...state, count: action.count }
    default:
      return state
  }
}
