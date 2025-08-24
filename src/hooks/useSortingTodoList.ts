import { useTypedSelector } from './useTypedSelector'

export default function useSortingTodoList() {
  return useTypedSelector((state) => state.sortingTodoList)
}
