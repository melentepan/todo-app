import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function PublicRoute() {
  const token = Cookies.get('accessToken')

  if (token) {
    return <Navigate to='/profile' replace />
  }

  return <Outlet />
}
