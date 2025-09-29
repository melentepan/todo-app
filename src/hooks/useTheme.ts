import { useTypedSelector } from './useTypedSelector'

export function useTheme() {
  return useTypedSelector((state) => state.theme)
}
