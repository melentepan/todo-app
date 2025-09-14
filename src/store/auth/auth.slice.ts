import {
  changePassword,
  fetchUserProfile,
  loginUser,
  registerUser,
} from '@/api/auth'
import type { UserProfile } from '@/types'
import { removeRefreshToken, saveRefreshToken } from '@/utils/localStorage'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { message } from 'antd'

interface AuthState {
  user: UserProfile | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
}

const handleRejected = (
  state: AuthState,
  action: PayloadAction<string | undefined>
) => {
  state.status = 'failed'

  message.error(action.payload)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      removeRefreshToken()
      Cookies.remove('accessToken')
      message.success('Выход выполнен успешно')
    },
    sessionExpired(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      removeRefreshToken()
      Cookies.remove('accessToken')
      message.error('Сессия истекла, выполните вход заново')
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveRefreshToken(action.payload.refreshToken)
        Cookies.set('accessToken', action.payload.accessToken)
        message.success('Регистрация выполнена успешно')
      })
      .addCase(registerUser.rejected, handleRejected)

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveRefreshToken(action.payload.refreshToken)
        Cookies.set('accessToken', action.payload.accessToken)
        message.success('Вход выполнен успешно')
      })
      .addCase(loginUser.rejected, handleRejected)

      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, handleRejected)

      // Change password
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'idle'
        message.success('Пароль успешно изменён')
      })
      .addCase(changePassword.rejected, handleRejected)
  },
})

export default authSlice.reducer
export const { logoutUser, sessionExpired } = authSlice.actions
