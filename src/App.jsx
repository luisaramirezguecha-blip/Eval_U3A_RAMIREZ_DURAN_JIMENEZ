import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Licitaciones from './pages/Licitaciones'
import Detalle from './pages/Detalle'
import Proveedores from './pages/Proveedores'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/licitaciones" element={<Licitaciones />} />
        <Route path="/detalle/:codigo" element={<Detalle />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App