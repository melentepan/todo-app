import type { Todo } from '@/types'

export function saveIsDarkTheme(theme: boolean) {
  localStorage.setItem('theme', theme ? 'dark' : 'light')
}

export function loadIsDarkTheme(): boolean {
  return (
    (localStorage.getItem('theme') ??
      window.matchMedia('(prefers-color-scheme: dark)').matches) === 'dark'
  )
}

export function saveTodosList(todosList: Todo[]) {
  localStorage.setItem('todosList', JSON.stringify(todosList))
}

export function loadTodosList(): Todo[] {
  try {
    const item = localStorage.getItem('todosList')
    if (!item) return []
    return JSON.parse(item)
  } catch {
    return []
  }
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export function loadAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}

export function loadRefreshToken(): string | null {
  return localStorage.getItem('refreshToken')
}

export function removeTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
