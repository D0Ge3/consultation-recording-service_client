import { instance } from './axiosInstance'

export const consultationsAPI = {
  getConsultations(filter) {
    // filter may be 'future' or 'latest'
    return instance.get(`/consultations/${filter}`).then((res) => res)
  },
}
