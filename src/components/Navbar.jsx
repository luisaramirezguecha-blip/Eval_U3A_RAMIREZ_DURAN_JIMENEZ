import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-chilecompra-navbar.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [altoContraste, setAltoContraste] = useState(false)

  const handleContraste = () => {
    const root = document.documentElement
    if (!altoContraste) {
      root.classList.add('alto-contraste')
    } else {
      root.classList.remove('alto-contraste')
    }
    setAltoContraste(!altoContraste)
  }

  return (
    <>
      {/* Barra superior */}
      <div className="bg-[#0A3D91] text-white/85 text-[13px] py-2">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <span>Plataforma de información de licitaciones públicas · Chile</span>
          <nav className="flex gap-6" aria-label="Opciones de accesibilidad">
            <a href="#" className="hover:text-white hover:underline text-white/85">Accesibilidad</a>
            <button
              onClick={handleContraste}
              className="bg-transparent hover:underline cursor-pointer text-white/85 hover:text-white font-medium border-none"
              aria-label="Cambiar contraste"
            >
              {altoContraste ? 'Desactivar Contraste' : 'Activar Contraste'}
            </button>
          </nav>
        </div>
      </div>

      {/* Navbar principal */}
      <header className="bg-white border-b border-[#0A3D91]/10 py-3 sticky top-0 z-50" id="navbar">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between gap-4" aria-label="Navegación principal">

            {/* Logo */}
            <Link to="/" aria-label="LicitaSeguro — Inicio">
              <img src={logo} alt="Logotipo de LicitaSeguro" className="h-[45px] w-auto" />
            </Link>

            {/* Links desktop */}
            <ul className={`md:flex items-center gap-1 list-none ${menuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white border-b border-[#0A3D91]/10 p-4 z-50' : 'hidden'}`}>
              <li><Link to="/" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Inicio</Link></li>
              <li><Link to="/licitaciones" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Licitaciones</Link></li>
              <li><Link to="/proveedores" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Proveedores</Link></li>
              <li><a href="#ayuda" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Ayuda</a></li>
            </ul>

            {/* ClaveÚnica */}
            <a href="#claveunica" className="hidden md:inline-flex items-center gap-2 bg-[#0A3D91] text-white text-[14px] font-semibold px-4 py-2 rounded-lg hover:bg-[#1756C8] transition-colors no-underline" aria-label="Ingresar con ClaveÚnica">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M12 17v4m-4 0h8M5 12V6a7 7 0 0114 0v6" /><rect x="3" y="12" width="18" height="8" rx="2" />
              </svg>
              ClaveÚnica
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden border border-[#0A3D91]/10 rounded-md p-2 bg-transparent cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </nav>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
            <ul className="flex flex-col gap-3 list-none">
              <li><Link to="/" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#4A4845] no-underline block py-1">Inicio</Link></li>
              <li><Link to="/licitaciones" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#4A4845] no-underline block py-1">Licitaciones</Link></li>
              <li><Link to="/proveedores" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#4A4845] no-underline block py-1">Proveedores</Link></li>
              <li><a href="#ayuda" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#4A4845] no-underline block py-1">Ayuda</a></li>
            </ul>
          </div>
        )}

      </header>
    </>
  )
}

export default Navbar