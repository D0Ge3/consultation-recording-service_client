import { instance } from './axiosInstance'

export const registrationAPI = {
  register(regData) {
    return instance.post('/auth/users/', regData).then((res) => res)
  },
  getGroups() {
    return instance.get('/groups/').then((res) => res)
  }
  // verifyEmail(token) {
  //   return instance.post('/auth/jwt/verify/', { token }).then((res) => res)
  // },
}
