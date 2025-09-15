import { sessionExpired } from '@/store/auth/auth.slice'
import { store } from '@/store/store'
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

let refreshPromise: Promise<string | null> | null = null

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true

      if (!refreshPromise) {
        refreshPromise = refreshAuthTokens()
          .catch(() => null)
          .finally(() => {
            refreshPromise = null
          })
      }

      const newAccessToken = await refreshPromise

      if (!newAccessToken) {
        store.dispatch(sessionExpired())
        return Promise.reject('Сессия истекла, выполните вход заново')
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return privateApi(originalRequest)
    }

    return Promise.reject('Сессия истекла, выполните вход заново')
  }
)
