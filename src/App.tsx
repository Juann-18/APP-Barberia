import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Index } from './pages/Index'
import { AppointmenrPage } from './pages/AppointmenrPage'
import { SignUp } from './pages/SignUp'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Index/>} />
          <Route path = '/cita' element={<AppointmenrPage/>} />
          <Route path='register' element={<SignUp/>}/>
          {/* Puedes agregar más rutas aquí */}
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
