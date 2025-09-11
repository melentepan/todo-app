import type { AuthTokens } from '@/types'
import {
  loadRefreshToken,
  removeTokens,
  saveTokens,
} from '@/utils/localStorage'
import axios from 'axios'

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
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
          removeTokens()
          return Promise.reject(error)
        }

        const { data } = await axios.post<AuthTokens>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            refreshToken,
          }
        )

        saveTokens(data.accessToken, data.refreshToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return privateApi(originalRequest)
      } catch (e) {
        removeTokens()
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)
