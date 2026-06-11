import { useEffect } from "react";
import { useLicitaciones } from "./hooks/useLicitaciones";

// ─── Componente ──────────────────────────────────────────────────────────────

export default function Licitaciones() {
  const {
    fecha,        setFecha,
    estado,       setEstado,
    filas,
    infoPag,
    btnSigText,
    mostrarPag,
    mostrarAnterior,
    loader,
    error,
    iniciarBusqueda,
    cargarSiguiente,
    cargarAnterior,
  } = useLicitaciones();

  useEffect(() => {
    iniciarBusqueda();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") iniciarBusqueda();
  };

  return (
    <>
      {/* ── Topbar ─────────────────────────────────────────────────────── */}
      <div className="bg-[#1a3a5c] text-white/85 text-[0.8rem] py-[6px]" role="banner" aria-label="Barra de utilidades">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-4">
          <span>Plataforma de información de licitaciones públicas · Chile</span>
          <nav className="flex gap-4" aria-label="Enlaces de utilidad">
            <a href="accesibilidad.html" className="text-white/70 no-underline text-[0.8rem] hover:text-white transition-colors">Accesibilidad</a>
            <a href="#contraste" className="text-white/70 no-underline text-[0.8rem] hover:text-white transition-colors" aria-label="Cambiar contraste">Contraste</a>
            <a href="#idioma" className="text-white/70 no-underline text-[0.8rem] hover:text-white transition-colors">Idioma</a>
          </nav>
        </div>
      </div>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#e5e7eb] py-3 sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.07)]" id="navbar">
        <div className="flex items-center justify-between max-w-[1200px] mx-auto px-4">
          <a href="../index.html" aria-label="LicitaSeguro — Inicio">
            <img src="../img/logo-chilecompra-navbar.png" alt="navbar-logo" height="45" />
          </a>

          <ul className="flex gap-6 list-none m-0 p-0" role="list">
            {[
              { href: "../index.html",       label: "Inicio"       },
              { href: "./licitaciones.html", label: "Licitaciones" },
              { href: "./proveedores.html",  label: "Proveedores"  },
              { href: "./detalle.html",      label: "Detalle"      },
              { href: "#ayuda",              label: "Ayuda"        },
            ].map(({ href, label }) => (
              <li key={label}>
                <a href={href} className="text-[#1a3a5c] no-underline font-medium text-[0.95rem] hover:opacity-80 transition-opacity">{label}</a>
              </li>
            ))}
          </ul>

          <a
            href="#claveunica"
            className="flex items-center gap-[0.4rem] bg-[#1a3a5c] text-white border-none rounded-md px-4 py-[0.45rem] font-semibold text-[0.9rem] cursor-pointer no-underline hover:bg-[#122a44] transition-colors"
            tabIndex={0}
            role="button"
            aria-label="Ingresar con ClaveÚnica — autenticación del Estado de Chile"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18">
              <path d="M12 17v4m-4 0h8M5 12V6a7 7 0 0114 0v6" />
              <rect x="3" y="12" width="18" height="8" rx="2" />
            </svg>
            ClaveÚnica
          </a>
        </div>
      </header>

      {/* ── Skip link ──────────────────────────────────────────────────── */}
      <a
        href="#contenido-principal"
        className="absolute left-[-9999px] top-auto focus:left-4 focus:top-4 focus:bg-white focus:text-[#1a3a5c] focus:p-2 focus:z-[200] focus:font-bold focus:shadow-md"
      >
        Ir al contenido principal
      </a>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main id="contenido-principal" className="py-10 min-h-[70vh] bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 id="titulo-pagina" className="text-[1.6rem] font-bold text-[#1a3a5c] mb-5">Buscar licitación</h1>

          {/* Filtros */}
          <section
            role="search"
            aria-labelledby="titulo-pagina"
            className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.07)] mb-5"
          >
            <div className="flex flex-wrap gap-4 items-end" role="group" aria-label="Filtros de búsqueda de licitaciones">

              <div className="flex-[1_1_220px]">
                <label htmlFor="fechaBusqueda" className="block font-bold text-[0.9rem] text-[#111827] mb-[0.3rem]">
                  Fecha: (dd/mm/aaaa)
                </label>
                <input
                  id="fechaBusqueda"
                  name="fechaBusqueda"
                  type="text"
                  className="w-full px-3 py-2 border border-[#d1d5db] rounded-md text-[0.95rem] outline-none box-border focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c] transition-all"
                  placeholder="Ej: 02/02/2024"
                  aria-describedby="ayuda-fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <span id="ayuda-fecha" className="hidden">
                  Ingrese la fecha en formato de 8 dígitos seguidos: día, mes y año.
                </span>
              </div>

              <div className="flex-[1_1_220px]">
                <label htmlFor="estadoLicitacion" className="block font-bold text-[0.9rem] text-[#111827] mb-[0.3rem]">
                  Estado de la licitación:
                </label>
                <select
                  id="estadoLicitacion"
                  name="estadoLicitacion"
                  className="w-full px-3 py-2 border border-[#d1d5db] rounded-md text-[0.95rem] bg-white box-border focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c] transition-all"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="activas">Activas</option>
                  <option value="publicadas">Publicadas</option>
                </select>
              </div>

              <div className="flex-[0_0_120px]">
                <button
                  id="btnBuscar"
                  className="w-full bg-[#1a3a5c] text-white border-none rounded-md py-[0.55rem] px-4 font-bold text-[0.95rem] cursor-pointer hover:bg-[#122a44] transition-colors"
                  aria-label="Buscar licitaciones con los filtros seleccionados"
                  onClick={iniciarBusqueda}
                >
                  Buscar
                </button>
              </div>

            </div>
          </section>

          {/* Loader */}
          {loader && (
            <div aria-live="polite" className="text-[#1a3a5c] font-bold mb-3">
              Cargando datos...
            </div>
          )}

          {/* Error */}
          {error && (
            <div aria-live="assertive" className="text-red-600 font-bold mb-3">
              {error}
            </div>
          )}

          {/* Tabla */}
          <section
            className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-x-auto"
            role="region"
            aria-label="Resultados de la búsqueda"
            tabIndex={0}
          >
            <table
              id="ListaResultados"
              className="w-full border-collapse text-[0.92rem]"
              aria-label="Tabla de licitaciones encontradas"
            >
              <thead>
                <tr>
                  <th scope="col" className="bg-[#f1f5f9] text-[#1a3a5c] font-bold py-3 px-4 text-left border-b-2 border-[#e5e7eb] whitespace-nowrap">Fecha</th>
                  <th scope="col" className="bg-[#f1f5f9] text-[#1a3a5c] font-bold py-3 px-4 text-left border-b-2 border-[#e5e7eb] whitespace-nowrap">Código Externo</th>
                  <th scope="col" className="bg-[#f1f5f9] text-[#1a3a5c] font-bold py-3 px-4 text-left border-b-2 border-[#e5e7eb] whitespace-nowrap">Nombre de Licitación</th>
                  <th scope="col" className="bg-[#f1f5f9] text-[#1a3a5c] font-bold py-3 px-4 text-left border-b-2 border-[#e5e7eb] whitespace-nowrap">Estado</th>
                </tr>
              </thead>
              <tbody id="cuerpoResultados">
                {filas.map((fila, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">
                      <span className="font-semibold text-[#1a3a5c]">{fila.fecha}</span>
                    </td>
                    <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">{fila.codigoExterno}</td>
                    <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">{fila.nombre}</td>
                    <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">
                      <span className="bg-[#e8f0fe] py-1 px-2 rounded text-[0.8rem] text-[#1a3a5c] font-medium">Cód: {fila.codigoEstado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Paginación */}
          {mostrarPag && (
            <nav
              className="flex items-center justify-center gap-4 mt-5 flex-wrap"
              id="controlesPaginacion"
              aria-label="Paginación de la tabla de resultados"
            >
              {mostrarAnterior && (
                <button
                  id="btnAnterior"
                  className="bg-white border-[1.5px] border-[#1a3a5c] text-[#1a3a5c] rounded-md px-[1.1rem] py-[0.45rem] font-semibold text-[0.9rem] cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-label="Ir a la página anterior"
                  onClick={cargarAnterior}
                >
                  Anterior
                </button>
              )}

              <span
                className="text-[#374151] text-[0.9rem] text-center"
                id="infoPaginacion"
                aria-live="polite"
              >
                {infoPag}
              </span>

              <button
                id="btnSiguiente"
                className="bg-white border-[1.5px] border-[#1a3a5c] text-[#1a3a5c] rounded-md px-[1.1rem] py-[0.45rem] font-semibold text-[0.9rem] cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Cargar el siguiente grupo de licitaciones"
                onClick={cargarSiguiente}
                disabled={loader}
              >
                {btnSigText}
              </button>
            </nav>
          )}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer id="ayuda" role="contentinfo" className="bg-[#1a3a5c] text-white/85 pt-10 pb-4 mt-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-8 max-w-[1200px] mx-auto px-4">
          <div>
            <a href="index.html" aria-label="LicitaSeguro inicio">
              <img src="../img/footer-img.png" alt="footer-icono" height="40" />
            </a>
            <p className="text-[0.85rem] text-white/65 mt-3 leading-relaxed">
              Información transparente y accesible sobre licitaciones públicas de Chile,
              pensada para la ciudadanía. Basado en datos de Mercado Público y ChileCompra.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-3">Plataforma</h4>
            <ul className="list-none p-0 m-0">
              {[
                { href: "licitaciones.html", label: "Licitaciones"  },
                { href: "detalle.html",      label: "Ver detalles"  },
                { href: "proveedores.html",  label: "Proveedores"   },
              ].map(({ href, label }) => (
                <li key={label} className="mb-[0.4rem]">
                  <a href={href} className="text-white/65 no-underline text-[0.88rem] hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-3">Ayuda</h4>
            <ul className="list-none p-0 m-0">
              {[
                { href: "#faq",      label: "Preguntas frecuentes" },
                { href: "#contacto", label: "Contacto"             },
                { href: "#glosario", label: "Glosario"             },
              ].map(({ href, label }) => (
                <li key={label} className="mb-[0.4rem]">
                  <a href={href} className="text-white/65 no-underline text-[0.88rem] hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-3">Accesibilidad</h4>
            <ul className="list-none p-0 m-0">
              {[
                { href: "accesibilidad.html", label: "Declaración WCAG 2.1"          },
                { href: "#transparencia",     label: "Transparencia"                 },
                { href: "#",                  label: "Ley N° 20.285", aria: "Ley de Transparencia N° 20.285" },
              ].map(({ href, label, aria }) => (
                <li key={label} className="mb-[0.4rem]">
                  <a href={href} className="text-white/65 no-underline text-[0.88rem] hover:text-white transition-colors" aria-label={aria}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-6 pt-4 px-4 border-t border-white/15 text-[0.82rem] text-white/50">
          <span>
            Datos provistos por{" "}
            <a href="https://api.mercadopublico.cl" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              Mercado Público
            </a>{" "}y{" "}
            <a href="https://datos-abiertos.chilecompra.cl" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              ChileCompra
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}