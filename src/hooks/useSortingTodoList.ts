import { useTypedSelector } from './useTypedSelector'

export function useSortingTodoList() {
  return useTypedSelector((state) => state.sortingTodoList)
}
