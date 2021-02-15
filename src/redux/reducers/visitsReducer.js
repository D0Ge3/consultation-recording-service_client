import * as actionTypes from '../actions/visitsActions'

const initialState = {
  visits: [],
}

export const visitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VISITS:
      return { ...state, visits: action.visits }
    default:
      return state
  }
}
