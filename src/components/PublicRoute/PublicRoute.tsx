import { Navigate, Outlet } from 'react-router-dom'
import useAuthState from '@/hooks/useAuthState'

export default function PublicRoute() {
  const { token } = useAuthState()

  if (token) {
    return <Navigate to='/profile' replace />
  }

  return <Outlet />
}
