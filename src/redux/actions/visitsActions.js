import { visitsAPI } from '../../api'
import { catchNetworkError } from './helpers/catchNetworkError'

export const SET_VISITS = 'visits/SET_VISITS'

export const setVisits = (visits) => ({ type: SET_VISITS, visits })

export const getVisits = (id_consultation) => async (dispatch) => {
  try {
    const res = await visitsAPI.getVisits(id_consultation)
    dispatch(setVisits(res.data))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const updateVisit = (id_wrote, is_visit) => async (dispatch, getState) => {
  try {
    await visitsAPI.updateVisit(id_wrote, is_visit)
    const id_consultation = getState().visits.visits[0].id_consultation
    dispatch(getVisits(id_consultation))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}
