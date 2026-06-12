import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Licitaciones from './pages/Licitaciones';
import Proveedores from './pages/proveedores'; // Mantiene la minúscula de tu árbol
import Detalle from './pages/Detalle';
import Home from './pages/home';

// Importamos el proveedor con llaves desde su ubicación actual
import { AccesibilidadProvider } from './pages/Accesibilidad';

function App() {
  return (
    // Envolvemos toda la aplicación para que el Alto Contraste funcione globalmente
    <AccesibilidadProvider>
      <Router>
        <Routes>
          {/* Pantallas principales del sistema */}
          <Route path="/" element={<Licitaciones />} />
          <Route path="/licitaciones" element={<Licitaciones />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/home" element={<Home />} />
          
          {/* Redirección de seguridad */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AccesibilidadProvider>
  );
}

export default App;