import * as axios from 'axios'

const token = localStorage.getItem('access')
const baseUrl = 'http://127.0.0.1:8000/api'

export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Authorization: token && `JWT ${token}`,
  },
})
