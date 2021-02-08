import * as actionTypes from '../actions/consultationsActions'

const initialState = {
  consultations: [],
  selectedConsultation: null,
  count: null,
  page: null,
  pageSize: 10,
  freeTimes: [],
}

export const consultationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONSULTATIONS:
      return { ...state, consultations: action.consultations }
    case actionTypes.SET_COUNT:
      return { ...state, count: action.count }
    case actionTypes.SET_PAGE:
      return { ...state, page: action.page }
    case actionTypes.SET_SELECTED_CONSULTATION:
      return { ...state, selectedConsultation: action.consultation }
    case actionTypes.SET_FREE_TIMES:
      return { ...state, freeTimes: action.times }
    case actionTypes.SET_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize }
    default:
      return state
  }
}
