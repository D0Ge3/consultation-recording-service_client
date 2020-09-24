import { consultationsAPI } from '../../api'

export const SET_CONSULTATIONS = 'consultations/SET_CONSULTATIONS'
export const SET_COUNT = 'consultations/SET_COUNT'

export const setConsultations = (consultations) => ({ type: SET_CONSULTATIONS, consultations })
export const setCount = (count) => ({ type: SET_COUNT, count })

export const getConsultations = (filter) => async (dispatch) => {
  try {
    const res = await consultationsAPI.getConsultations(filter)
    dispatch(setCount(res.data.count))
    dispatch(setConsultations(res.data.results))
  } catch (error) {
    console.log('err')
  }
}
export const takeTicket = (id_consultation) => async (dispatch) =>  {
  try {
    const res = consultationsAPI.takeTicket(id_consultation)
    dispatch(getConsultations('future'))
  } catch (error) {
    console.log('err')
  }
}
