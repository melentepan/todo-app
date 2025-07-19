import type { StatusType } from './types'

export const statusCycle = ['date', 'text', 'completed', 'uncompleted'] as const

export const statusText: Record<StatusType, string> = {
  date: 'По добавлению',
  text: 'По названию',
  completed: 'Выполненные',
  uncompleted: 'Невыполненные',
}
