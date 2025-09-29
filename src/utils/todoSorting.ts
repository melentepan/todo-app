import type { StatusType, Todo } from '@/types'

export function todoSorting(
  todosList: Todo[],
  status: StatusType,
  order: 'asc' | 'desc'
): Todo[] {
  let filtered = [...todosList]

  if (status === 'completed') {
    filtered = filtered.filter((todo) => todo.completed)
  } else if (status === 'uncompleted') {
    filtered = filtered.filter((todo) => !todo.completed)
  } else if (status === 'date') {
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })
  } else if (status === 'text') {
    filtered.sort((a, b) => {
      const textA = a.text.toLowerCase()
      const textB = b.text.toLowerCase()
      if (textA < textB) return order === 'asc' ? -1 : 1
      if (textA > textB) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  return filtered
}
