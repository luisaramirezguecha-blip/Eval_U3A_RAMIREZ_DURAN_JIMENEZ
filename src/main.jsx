import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Licitaciones from './pages/Licitaciones.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Licitaciones />
  </StrictMode>,
)