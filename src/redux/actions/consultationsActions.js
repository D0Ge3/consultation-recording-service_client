import { consultationsAPI } from '../../api'
import moment from 'moment'
import { setIsLoading } from './appActions'
import { catchNetworkError } from './helpers/catchNetworkError'

export const SET_CONSULTATIONS = 'consultations/SET_CONSULTATIONS'
export const SET_COUNT = 'consultations/SET_COUNT'
export const SET_SELECTED_CONSULTATION = 'consultations/SET_SELECTED_CONSULTATION'
export const SET_PAGE = 'consultations/SET_PAGE'
export const SET_PAGE_SIZE = 'consultations/SET_PAGE_SIZE'
export const SET_FREE_TIMES = 'consultations/SET_FREE_TIMES'

export const setConsultations = (consultations) => ({ type: SET_CONSULTATIONS, consultations })
export const setSelectedConsultation = (consultation) => ({ type: SET_SELECTED_CONSULTATION, consultation })
export const setCount = (count) => ({ type: SET_COUNT, count })
export const setPage = (page) => ({ type: SET_PAGE, page })
export const setFreeTimes = (times) => ({ type: SET_FREE_TIMES, times })
export const setPageSize = (pageSize) => ({ type: SET_PAGE_SIZE, pageSize })

export const getConsultations = (filter, page, showLoader = true) => async (dispatch, getState) => {
  try {
    showLoader && dispatch(setIsLoading(true))
    const pageSize = getState().consultations.pageSize
    const res = await consultationsAPI.getConsultations(filter, page, pageSize)
    dispatch(setCount(res.data.count))
    dispatch(setPage(page))
    dispatch(setConsultations(res.data.results))
    dispatch(setIsLoading(false))
  } catch (error) {
    console.log('err')
    showLoader && dispatch(setIsLoading(false))
    catchNetworkError(error, dispatch)
  }
}
export const getMyConsultations = (filter, page, showLoader = true) => async (dispatch, getState) => {
  try {
    showLoader && dispatch(setIsLoading(true))
    const role = getState().profile.role
    const pageSize = getState().consultations.pageSize
    let res
    if (role === 'teacher') {
      res = await consultationsAPI.getMyConsultations(filter, page, pageSize)
    } else if (role === 'student') {
      res = await consultationsAPI.getMyTickets(filter, page, pageSize)
    }
    dispatch(setCount(res.data.count))
    dispatch(setPage(page))
    dispatch(setConsultations(res.data.results))
    showLoader && dispatch(setIsLoading(false))
  } catch (error) {
    console.log(error)
    showLoader && dispatch(setIsLoading(false))
    catchNetworkError(error, dispatch)
  }
}
export const takeTicket = (id_consultation, data = {}) => async (dispatch, getState) => {
  try {
    const page = getState().consultations.page
    await consultationsAPI.takeTicket(id_consultation, data)
    dispatch(getConsultations('future', page, false))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const deleteTicket = (id_consultation) => async (dispatch, getState) => {
  try {
    const currentPage = getState().consultations.page
    const consultationsLength = getState().consultations.consultations.length
    const page = consultationsLength === 1 ? currentPage - 1 : currentPage
    await consultationsAPI.deleteTicket(id_consultation)
    dispatch(getMyConsultations('future', page, false))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const deleteConsultation = (id_consultation) => async (dispatch, getState) => {
  try {
    const currentPage = getState().consultations.page
    const consultationsLength = getState().consultations.consultations.length
    const page = consultationsLength === 1 ? currentPage - 1 : currentPage
    await consultationsAPI.deleteConsultation(id_consultation)
    dispatch(getMyConsultations('future', page, false))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const createConsultation = (data) => async () => {
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
    catchNetworkError(error)
  }
}

export const updateConsultation = (data) => async () => {
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

export const getFreeTimes = (id_consultation) => async (dispatch) => {
  try {
    const res = await consultationsAPI.getFreeTimes(id_consultation)
    dispatch(setFreeTimes(res.data))
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}
