import type { AuthTokens } from '@/types'
import {
  loadRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
} from '@/utils/localStorage'
import axios from 'axios'
import Cookies from 'js-cookie'

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

privateApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`
  return config
})

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const refreshToken = loadRefreshToken()
        if (!refreshToken) {
          removeRefreshToken()
          Cookies.remove('accessToken')
          return Promise.reject(error)
        }

        const { data } = await axios.post<AuthTokens>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refreshToken,
          }
        )

        saveRefreshToken(data.refreshToken)
        Cookies.set('accessToken', data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return privateApi(originalRequest)
      } catch (e) {
        removeRefreshToken()
        Cookies.remove('accessToken')
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)
