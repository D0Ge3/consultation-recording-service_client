import { instance } from './axiosInstance'

export const consultationsAPI = {
  getConsultations(filter, page, pageSize) {
    // filter may be 'future' or 'latest'
    return instance
      .get(`/consultations/${filter}?page_size=${pageSize}&page=${page}`)
      .then((res) => res)
  },
  getMyConsultations(filter, page, pageSize) {
    return instance
      .get(`/consultations/${filter}/my?page_size=${pageSize}&page=${page}`)
      .then((res) => res)
  },
  deleteConsultation(id_consultation) {
    return instance.delete(`/consultation/${id_consultation}`).then((res) => res)
  },
  createConsultation(data) {
    return instance.post('/consultation/', data).then((res) => res)
  },
  getConsultation(id_consultation) {
    return instance.get(`/consultation/${id_consultation}`).then((res) => res)
  },
  updateConsultation(data) {
    return instance.put(`/consultation/${data.id_consultation}`, data).then((res) => res)
  },
  takeTicket(id_consultation, data = {}) {
    return instance.post(`/tickets/${id_consultation}`, data).then((res) => res)
  },
  getFreeTimes(id_consultation) {
    return instance.get(`consultation/${id_consultation}/free-times`).then((res) => res)
  },
  deleteTicket(id_consultation) {
    return instance.delete(`/tickets/${id_consultation}`).then((res) => res)
  },
  getMyTickets(filter, page, pageSize) {
    return instance
      .get(`/tickets/${filter}/my?page_size=${pageSize}&page=${page}`)
      .then((res) => res)
  },
}
