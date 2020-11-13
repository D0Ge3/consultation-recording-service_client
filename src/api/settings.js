import { instance } from './axiosInstance'

export const settingsAPI = {
  updateProfile(data) {
    return instance.put('/auth/users/me/', data).then((res) => res)
  },
  changePassword(new_password, current_password) {
    return instance
      .post('/auth/users/set_password/', { new_password, current_password })
      .then((res) => res)
  },
}
