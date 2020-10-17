import { instance } from './axiosInstance'

export const visitsAPI = {
  getVisits(id_consultation) {
    return instance.get(`/consultation/${id_consultation}/visits`).then((res) => res)
  },
  updateVisit(id_wrote, is_visit) {
    return instance.put(`visit/${id_wrote}`, { is_visit }).then((res) => res)
  },
}
