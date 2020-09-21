import { instance } from './axiosInstance'

export const scheduleAPI = {
  getUserSchedule() {
    return instance.get('/userschedule/').then((res) => res)
  },
}