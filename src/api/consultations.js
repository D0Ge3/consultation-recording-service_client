import { instance } from './axiosInstance'

export const consultationsAPI = {
  getConsultations(filter) {
    // filter may be 'future' or 'latest'
    return instance.get(`/consultations/${filter}`).then((res) => res)
  },
  takeTicket(id_consultation) {
    return instance.post(`/tickets/${id_consultation}`)
  },
  deleteTicket(id_consultation) {
    return instance.delete(`/tickets/${id_consultation}`)
  },
}
