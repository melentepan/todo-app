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
