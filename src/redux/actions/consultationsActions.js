import { consultationsAPI } from '../../api'
import moment from 'moment'

export const SET_CONSULTATIONS = 'consultations/SET_CONSULTATIONS'
export const SET_COUNT = 'consultations/SET_COUNT'
export const SET_SELECTED_CONSULTATION = 'consultations/SET_SELECTED_CONSULTATION'
export const SET_PAGE = 'consultations/SET_PAGE'

export const setConsultations = (consultations) => ({ type: SET_CONSULTATIONS, consultations })
export const setSelectedConsultation = (consultation) => ({ type: SET_SELECTED_CONSULTATION, consultation })
export const setCount = (count) => ({ type: SET_COUNT, count })
export const setPage = (page) => ({ type: SET_PAGE, page })

export const getConsultations = (filter, page, pageSize) => async (dispatch) => {
  try {
    const res = await consultationsAPI.getConsultations(filter, page, pageSize)
    dispatch(setCount(res.data.count))
    dispatch(setPage(page))
    dispatch(setConsultations(res.data.results))
  } catch (error) {
    console.log('err')
  }
}
export const getMyConsultations = (filter, page, pageSize = 5) => async (dispatch, getState) => {
  try {
    const role = getState().profile.role
    let res
    if (role === 'teacher') {
      res = await consultationsAPI.getMyConsultations(filter, page, pageSize)
    } else if (role === 'student') {
      res = await consultationsAPI.getMyTickets(filter, page, pageSize)
    }
    dispatch(setCount(res.data.count))
    dispatch(setPage(page))
    dispatch(setConsultations(res.data.results))
  } catch (error) {
    console.log('err')
  }
}
export const takeTicket = (id_consultation) => async (dispatch) => {
  try {
    const res = await consultationsAPI.takeTicket(id_consultation)
    dispatch(getConsultations('future'))
  } catch (error) {
    console.log('err')
  }
}

export const deleteTicket = (id_consultation) => async (dispatch, getState) => {
  try {
    const page = getState().consultations.page
    const res = await consultationsAPI.deleteTicket(id_consultation)
    dispatch(getMyConsultations('future', page)) // page в reducer
  } catch (error) {
    console.log('err')
  }
}

export const deleteConsultation = (id_consultation) => async (dispatch, getState) => {
  try {
    const page = getState().consultations.page
    const res = await consultationsAPI.deleteConsultation(id_consultation)
    dispatch(getMyConsultations('future', page))
  } catch (error) {
    console.log('err')
  }
}

export const createConsultation = (data) => async (dispatch) => {
  const end_time = moment().set({
    year: data.start_time.get('year'),
    month: data.start_time.get('month'),
    date: data.start_time.get('date'),
    hour: data.end_time.get('hour'),
    minute: data.end_time.get('minute'),
  })
  const consultationData = {
    ...data,
    start_time: data.start_time,
    end_time: end_time,
    teacher_subject: data.teacher_subject.map((s) => s.teacher_subject),
  }
  return await consultationsAPI.createConsultation(consultationData)
}

export const getConsultation = (id_consultation) => async (dispatch) => {
  try {
    const res = await consultationsAPI.getConsultation(id_consultation)
    dispatch(setSelectedConsultation(res.data))
  } catch (error) {
    console.log('err')
  }
}

export const updateConsultation = (data) => async (dispatch) => {
  const end_time = moment().set({
    year: data.start_time.get('year'),
    month: data.start_time.get('month'),
    date: data.start_time.get('date'),
    hour: data.end_time.get('hour'),
    minute: data.end_time.get('minute'),
  })
  const consultationData = {
    ...data,
    start_time: data.start_time,
    end_time: end_time,
    teacher_subject: data.teacher_subject.map((s) => s.teacher_subject),
  }
  return await consultationsAPI.updateConsultation(consultationData)
}

export const resetConsultations = () => async (dispatch) => {
  dispatch(setConsultations([]))
  dispatch(setCount(null))
  dispatch(setPage(null))
}