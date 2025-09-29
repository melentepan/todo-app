import { useTypedSelector } from './useTypedSelector'

export function useTodoList() {
  return useTypedSelector((state) => state.todoList)
}
