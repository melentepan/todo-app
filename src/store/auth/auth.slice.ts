import {
  changePassword,
  fetchUserProfile,
  loginUser,
  refreshToken,
  registerUser,
} from '@/api/auth'
import type { UserProfile } from '@/types'
import { saveTokens } from '@/utils/localStorage'
import { createSlice } from '@reduxjs/toolkit'

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.token = action.payload.accessToken
        saveTokens(action.payload.accessToken, action.payload.refreshToken)
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
        saveTokens(action.payload.accessToken, action.payload.refreshToken)
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
        saveTokens(action.payload.accessToken, action.payload.refreshToken)
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
