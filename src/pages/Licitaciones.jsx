import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLicitacionesPorFechaYEstado } from '../components/LicitacionesPorFechaYEstado';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Componente ──────────────────────────────────────────────────────────────

export default function Licitaciones() {
  const navigate = useNavigate();
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
  } = useLicitacionesPorFechaYEstado();

  useEffect(() => {
    iniciarBusqueda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") iniciarBusqueda();
  };

  return (
    <>
      {/*Navbar*/}
      <Navbar />

      {/*Skip link*/}
      <a
        href="#contenido-principal"
        className="absolute left-[-9999px] top-auto focus:left-4 focus:top-4 focus:bg-white focus:text-[#1a3a5c] focus:p-2 focus:z-[200] focus:font-bold focus:shadow-md"
      >
        Ir al contenido principal
      </a>

      {/*Main*/}
      <main id="contenido-principal" className="py-10 min-h-[70vh] bg-[#f8fafc] flex-1">
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
                    <tr
                      key={i}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/detalle/${encodeURIComponent(fila.codigoExterno)}`)}
                      tabIndex={0}
                      aria-label={`Ver detalle de licitación ${fila.nombre}`}
                      onKeyDown={(e) => e.key === 'Enter' && navigate(`/detalle/${encodeURIComponent(fila.codigoExterno)}`)}
                    >
                      <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">
                        <span className="font-semibold text-[#1a3a5c]">{fila.fecha}</span>
                      </td>
                      <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">{fila.codigoExterno}</td>
                      <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle">{fila.nombre}</td>
                      <td className="py-[0.7rem] px-4 border-b border-[#f1f5f9] align-middle text-center">
                        <span className="bg-[#e8f0fe] py-1 px-3 rounded text-[0.8rem] text-[#1a3a5c] font-medium whitespace-nowrap inline-block">
                          Cód: {fila.codigoEstado}
                        </span>
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
      <Footer />
    </>
  );
}