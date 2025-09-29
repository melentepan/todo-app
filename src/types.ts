import type { statusCycle } from './constants'
export type StatusType = (typeof statusCycle)[number]

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  loading?: boolean
}

export interface TodoResponse {
  data: Todo[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AddTodoBody {
  text: string
}

export interface AddTodoResponse {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export interface UpdateTodoBody {
  text: string
}

export interface RegisterBody {
  email: string
  password: string
  age: number | null
}

export interface LoginBody {
  email: string
  password: string
}

export interface UserProfile {
  id: number
  email: string
  age: number | null
  createdAt: string
}

export interface ChangePasswordBody {
  oldPassword: string
  newPassword: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenBody {
  refreshToken: string
}

export interface ChangePasswordResponse {
  success: boolean
  message: string
}
