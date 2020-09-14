import { instance } from './axiosInstance'

export const profileAPI = {
  me() {
    return instance.get('/auth/users/me/').then((res) => res)
  },
  getSubjects() {
    return instance.get('/subjects/').then((res) => res)
  },
}
