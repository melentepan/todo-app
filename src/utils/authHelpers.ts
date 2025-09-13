// authHelpers.ts
import axios from 'axios'
import Cookies from 'js-cookie'
import {
  loadRefreshToken,
  saveRefreshToken,
  removeRefreshToken,
} from '@/utils/localStorage'
import type { AuthTokens } from '@/types'

export async function refreshAuthTokens(): Promise<string | null> {
  const refreshToken = loadRefreshToken()
  if (!refreshToken) {
    clearAuthTokens()
    return null
  }

  try {
    const { data } = await axios.post<AuthTokens>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      { refreshToken }
    )

    saveRefreshToken(data.refreshToken)
    Cookies.set('accessToken', data.accessToken)

    return data.accessToken
  } catch {
    clearAuthTokens()
    return null
  }
}

export function clearAuthTokens() {
  removeRefreshToken()
  Cookies.remove('accessToken')
}
