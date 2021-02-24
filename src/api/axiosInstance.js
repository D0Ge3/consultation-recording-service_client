import * as axios from 'axios'

const token = localStorage.getItem('access')
const baseUrl = process.env.REACT_APP_API_URL

export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Authorization: token && `JWT ${token}`,
  },
})
