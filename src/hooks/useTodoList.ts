import { useTypedSelector } from './useTypedSelector'

export default function useTodoList() {
  return useTypedSelector((state) => state.todoList)
}
