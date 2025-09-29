import { useTypedSelector } from './useTypedSelector'

export function useAuthState() {
  return useTypedSelector((state) => state.auth)
}
