import { Route, Routes } from 'react-router-dom'
import { Layout, ProtectedRoute, PublicRoute } from '@components'
import { Homepage, LoginPage, NotFoundPage, ProfilePage, RegistrationPage } from '@pages'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Homepage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
