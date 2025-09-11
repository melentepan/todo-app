import { useTypedSelector } from './useTypedSelector'

export default function useAuthState() {
  return useTypedSelector((state) => state.auth)
}
