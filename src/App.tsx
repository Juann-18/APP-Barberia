import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Index } from './pages/Index'
import { AppointmenrPage } from './pages/AppointmenrPage'
import { SignUp } from './pages/SignUp'
import { DashboardBarber } from './pages/DashboardBarber'
import { Profile } from './pages/Profile'
import { Schedule } from './pages/Schedule'
import { Services } from './pages/Services'
import { Appointments } from './pages/Appointments'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Index/>} />
          <Route path = '/cita' element={<AppointmenrPage/>} />
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/dashboardBarber' element={<DashboardBarber/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/schedule' element={<Schedule/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/appointments' element={<Appointments/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
