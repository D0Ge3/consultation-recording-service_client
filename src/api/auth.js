import { instance } from './axiosInstance'

export const authAPI = {
  getToken(email, password) {
    // eslint-disable-next-line
    return instance.post('/auth/jwt/create/', { email, password }).then((res) => res)
  },
  verifyToken(token) {
    return instance.post('/auth/jwt/verify/', { token }).then((res) => res)
  },
  activateAccount(uid, token) {
    // eslint-disable-next-line
    return instance.post('/auth/users/activation/', { uid, token }).then((res) => res)
  },
  resetPassword(email) {
    // eslint-disable-next-line
    return instance.post('/auth/users/reset_password/', { email }).then((res) => res)
  },
  resetPasswordConfirm(uid, token, new_password) {
    return instance
      .post('/auth/users/reset_password_confirm/', { uid, token, new_password })
      .then((res) => res)
  },
}
