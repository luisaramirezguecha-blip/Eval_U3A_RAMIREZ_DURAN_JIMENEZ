import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-chilecompra-navbar.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Barra superior */}
      <div className="bg-[#0A3D91] text-white/85 text-[13px] py-2">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
          <span>Plataforma de información de licitaciones públicas · Chile</span>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-white hover:underline">Accesibilidad</a>
            <a href="#" className="hover:text-white hover:underline">Contraste</a>
            <a href="#" className="hover:text-white hover:underline">Idioma</a>
          </nav>
        </div>
      </div>

      {/* Navbar principal */}
      <header className="bg-white border-b border-[#0A3D91]/10 py-3 sticky top-0 z-50" id="navbar">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 no-underline">
              <img src={logo} alt="LicitaSeguro" height={45} className="h-[45px] w-auto" />
            </a>

            {/* Links desktop */}
            <ul className={`md:flex items-center gap-1 list-none ${menuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white border-b border-[#0A3D91]/10 p-4 z-50' : 'hidden'}`}>
              <li><Link to="/" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Inicio</Link></li>
              <li><Link to="/licitaciones" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Licitaciones</Link></li>
              <li><Link to="/proveedores" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Proveedores</Link></li>
              <li><a href="#ayuda" className="text-[14px] font-medium text-[#4A4845] px-3 py-2 rounded-md hover:bg-[#EBF1FB] hover:text-[#0A3D91] transition-colors no-underline block">Ayuda</a></li>
            </ul>

            {/* ClaveUnica */}
            <a href="#" className="hidden md:inline-flex items-center gap-2 bg-[#0A3D91] text-white text-[14px] font-semibold px-4 py-2 rounded-lg hover:bg-[#1756C8] transition-colors no-underline">
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
              <span className="block w-5 h-0.5 bg-[#1F1D1A] my-1 rounded"></span>
              <span className="block w-5 h-0.5 bg-[#1F1D1A] my-1 rounded"></span>
              <span className="block w-5 h-0.5 bg-[#1F1D1A] my-1 rounded"></span>
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar

// Disenio exclusivo de navbar, este se podra exportar entre paginas sin la necesidad de copiar / pegar el codigo
//solo lo llamamos mediante un "import"