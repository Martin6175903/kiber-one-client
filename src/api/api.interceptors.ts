import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import { SERVER_URL } from '@/src/config/api.config'
import { getContentType } from '@/src/api/api.helper'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  return config
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if ((error?.response?.status === 401 || error?.response?.status === 403) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      console.log(originalRequest)
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }