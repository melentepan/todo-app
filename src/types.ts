import type { statusCycle } from './constants'

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export type StatusType = (typeof statusCycle)[number]
