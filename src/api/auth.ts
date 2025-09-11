import type {
  AuthTokens,
  ChangePasswordBody,
  ChangePasswordResponse,
  LoginBody,
  RefreshTokenBody,
  RegisterBody,
  UserProfile,
} from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { authApi } from './authApi'
import { privateApi } from './privateApi'

export const registerUser = createAsyncThunk<
  AuthTokens,
  RegisterBody,
  { rejectValue: string }
>('auth/registerUser', async (body, { rejectWithValue }) => {
  try {
    const response = await authApi.post<AuthTokens>('/auth/register', body)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const loginUser = createAsyncThunk<
  AuthTokens,
  LoginBody,
  { rejectValue: string }
>('auth/loginUser', async (body, { rejectWithValue }) => {
  try {
    const response = await authApi.post<AuthTokens>('/auth/login', body)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const refreshToken = createAsyncThunk<
  AuthTokens,
  RefreshTokenBody,
  { rejectValue: string }
>('auth/refreshToken', async (body, { rejectWithValue }) => {
  try {
    const response = await authApi.post<AuthTokens>('/auth/refresh', body)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await privateApi.get<UserProfile>('/auth/me')
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordBody,
  { rejectValue: string }
>('auth/changePassword', async (body, { rejectWithValue }) => {
  try {
    const response = await privateApi.post<ChangePasswordResponse>(
      '/auth/change-password',
      body
    )
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})
