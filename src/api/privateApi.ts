import { refreshAuthTokens } from '@/utils/authHelpers'

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

      const newAccessToken = await refreshAuthTokens()
      if (!newAccessToken) {
        return Promise.reject(error)
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return privateApi(originalRequest)
    }

    return Promise.reject(error)
  }
)
