import { Navigate, Outlet } from 'react-router-dom'
import useAuthState from '@/hooks/useAuthState'

export default function ProtectedRoute() {
  const { token } = useAuthState()

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
