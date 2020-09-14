import { instance } from './axiosInstance'

export const authAPI = {
  getToken(email, password) {
    return instance.post('/auth/jwt/create/', { email, password }).then((res) => res)
  },
  verifyToken(token) {
    return instance.post('/auth/jwt/verify/', { token }).then((res) => res)
  },
}
