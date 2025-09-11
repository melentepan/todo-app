import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Layout from './components/Layout/Layout'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Homepage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
