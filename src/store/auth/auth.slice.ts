import {
  changePassword,
  fetchUserProfile,
  loginUser,
  refreshToken,
  registerUser,
} from '@/api/auth'
import type { UserProfile } from '@/types'
import { removeRefreshToken, saveRefreshToken } from '@/utils/localStorage'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface AuthState {
  user: UserProfile | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
      removeRefreshToken()
      Cookies.remove('accessToken')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveRefreshToken(action.payload.refreshToken)
        Cookies.set('accessToken', action.payload.accessToken)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Неизвестная ошибка'
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveRefreshToken(action.payload.refreshToken)
        Cookies.set('accessToken', action.payload.accessToken)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Неизвестная ошибка'
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveRefreshToken(action.payload.refreshToken)
        Cookies.set('accessToken', action.payload.accessToken)
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Неизвестная ошибка'
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Неизвестная ошибка'
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Неизвестная ошибка'
      })
  },
})

export default authSlice.reducer
export const { logoutUser } = authSlice.actions
