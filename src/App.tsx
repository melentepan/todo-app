import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Layout from './components/Layout/Layout'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}

export default App
