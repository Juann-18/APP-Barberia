import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { DashboardBarber } from './pages/DashboardBarber'
import { Profile } from './pages/Profile'
import { Schedule } from './pages/Schedule'
import { Services } from './pages/Services'
import { Appointments } from './pages/Appointments'
import { Login } from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={
              <SignUp />
            } />
            <Route path='/login' element={
              <Login />
            } />
            <Route path='/dashboardBarber' element={
              <ProtectedRoute requiredRole="barber">
                <DashboardBarber />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/schedule' element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } />
            <Route path='/services' element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />
            <Route path='/appointments' element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
          </Routes>

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
