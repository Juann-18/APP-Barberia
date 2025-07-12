import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Index } from './pages/Index'
import { AppointmenrPage } from './pages/AppointmenrPage'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<Index/>} />
          <Route path = '/cita' element={<AppointmenrPage/>} />
          {/* Puedes agregar más rutas aquí */}
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
