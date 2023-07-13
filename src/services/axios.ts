import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: 'https://tver-api.sitebeta.com.br/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const api_develop = axios.create({
  baseURL: 'https://api.github.com/users/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const api_contract = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token') || 'sem token nos cookies'

    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

