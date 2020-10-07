import { instance } from './axiosInstance'

export const consultationsAPI = {
  getConsultations(filter) {
    // filter may be 'future' or 'latest'
    return instance.get(`/consultations/${filter}`).then((res) => res)
  },
  getMyConsultations(filter) {
    return instance.get(`/consultations/${filter}/my`).then((res) => res)
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
  takeTicket(id_consultation) {
    return instance.post(`/tickets/${id_consultation}`).then((res) => res)
  },
  deleteTicket(id_consultation) {
    return instance.delete(`/tickets/${id_consultation}`).then((res) => res)
  },
  getMyTickets(filter) {
    return instance.get(`/tickets/${filter}/my`).then((res) => res)
  },
}
