import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import { SERVER_URL } from '@/src/config/api.config'
import { getContentType } from '@/src/api/api.helper'
import { authService } from '@/src/services/auth/auth.service'

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  return config
}, (error: AxiosError) => {
  console.log(error)
})

axiosWithAuth.interceptors.response.use(config =>
  config,
  (async (error: AxiosError) => {
    // if (error.request.cookies.get('SessionId')?.value) error.request.cookies.delete('SessionId')
    // new URL(PUBLIC_URL.auth(), error.request.url)
    console.log(error)
  })
)

export { axiosClassic, axiosWithAuth }