import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-chilecompra-navbar.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [altoContraste, setAltoContraste] = useState(false)

  // Función que activa/desactiva la clase en el HTML de forma limpia
  const handleContraste = () => {
    const root = document.documentElement;
    if (!altoContraste) {
      root.classList.add('alto-contraste');
    } else {
      root.classList.remove('alto-contraste');
    }
    setAltoContraste(!altoContraste);
  }

  return (
    <>
      {/* Barra superior informativa */}
      <div className="bg-[#0A3D91] text-white/85 text-[13px] py-2 transition-colors">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <span>Plataforma de información de licitaciones públicas · Chile</span>
          <nav className="flex gap-6" aria-label="Opciones de accesibilidad">
            <button 
              onClick={handleContraste}
              className="bg-transparent hover:underline focus:outline-none cursor-pointer text-white font-medium"
            >
              {altoContraste ? ' Desactivar Contraste' : 'Activar Contraste'}
            </button>
          </nav>
        </div>
      </div>

      {/* Navbar principal */}
      <header className="bg-white border-b border-gray-200 py-3 sticky top-0 z-50 shadow-sm" id="navbar">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={logo} alt="Logotipo de LicitaSeguro" height={45} className="h-[45px] w-auto" />
          </Link>

          {/* MENÚ DE ESCRITORIO (Los links que te faltaban) */}
          <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
            <li><Link to="/" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">Inicio</Link> </li><li>
                <Link to="/licitaciones" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">  Licitaciones 
                </Link></li>
            <li>
              <Link to="/proveedores" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">
                Proveedores
              </Link>
            </li>
            <li>
              <Link to="/detalle" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">
                Detalle
              </Link>
            </li>
            <li>
              <Link to="/ayuda" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">
                Ayuda
              </Link>
            </li>
            </ul>
          <div className="hidden md:block">
            <Link to="/alertas" className="text-[15px] font-semibold text-gray-800 hover:text-[#0A3D91] no-underline">
              Suscripción Alertas
            </Link>
          </div>
          {/* BOTÓN HAMBURGUESA PARA CELULARES */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-inner">
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              <li><Link to="/" onClick={() => setMenuOpen(false)} className="text-[15px] font-semibold text-gray-800 no-underline block py-1">Inicio</Link></li>
              <li><Link to="/licitaciones" onClick={() => setMenuOpen(false)} className="text-[15px] font-semibold text-gray-800 no-underline block py-1">Licitaciones</Link></li>
              <li><Link to="/proveedores" onClick={() => setMenuOpen(false)} className="text-[15px] font-semibold text-gray-800 no-underline block py-1">Proveedores</Link></li>
              <li><Link to="/detalle" onClick={() => setMenuOpen(false)} className="text-[15px] font-semibold text-gray-800 no-underline block py-1">Detalle</Link></li>
              <li><Link to="/ayuda" onClick={() => setMenuOpen(false)} className="text-[15px] font-semibold text-gray-800 no-underline block py-1">Ayuda</Link></li>
            
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
export default Navbar