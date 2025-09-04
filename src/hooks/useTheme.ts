import { useTypedSelector } from './useTypedSelector'

export default function useTheme() {
  return useTypedSelector((state) => state.theme)
}
