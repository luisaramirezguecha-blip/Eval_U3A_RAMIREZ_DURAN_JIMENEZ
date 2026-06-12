import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { limpiarTexto } from '../components/LicitacionesPorFechaYEstado'

const TICKET = "AC3A098B-4CD0-41AF-81A5-41284248419B"

const Detalle = () => {
  const { codigo } = useParams()
  const codigoDecodificado = decodeURIComponent(codigo)
  const navigate = useNavigate()
  const [licitacion, setLicitacion] = useState(null)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        setLoader(true)
        setError('')
        const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigoDecodificado}&ticket=${TICKET}`
        const resp = await fetch(url)
        if (!resp.ok) throw new Error(`Error del servidor ${resp.status}`)
        const datos = await resp.json()

        if (!datos.Listado || datos.Listado.length === 0) {
          setError('No se encontró información para esta licitación.')
          return
        }

        setLicitacion(datos.Listado[0])
      } catch (err) {
        console.error(err)
        setError('Error de conexión con Mercado Público.')
      } finally {
        setLoader(false)
      }
    }

    if (codigoDecodificado) fetchDetalle()
  }, [codigoDecodificado])

  return (
    <>
      <Navbar />
      <main id="contenido-principal" className="py-10 min-h-[70vh] bg-[#f8fafc] flex-1">
        <div className="max-w-[900px] mx-auto px-4">

          <button
            onClick={() => navigate('/licitaciones')}
            className="flex items-center gap-2 text-[#1a3a5c] font-semibold mb-6 hover:underline cursor-pointer bg-transparent border-none"
            aria-label="Volver al listado de licitaciones"
          >
            ← Volver al listado
          </button>

          <h1 className="text-[1.6rem] font-bold text-[#1a3a5c] mb-6">Detalle de Licitación</h1>

          {loader && (
            <div aria-live="polite" className="text-[#1a3a5c] font-bold">
              Cargando datos...
            </div>
          )}

          {error && (
            <div aria-live="assertive" className="text-red-600 font-bold">
              {error}
            </div>
          )}

          {licitacion && !loader && (
            <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-8 flex flex-col gap-6">

              <div className="flex justify-between items-start gap-4 flex-wrap">
                <h2 className="font-['Sora'] text-[1.2rem] font-bold text-[#1F1D1A] leading-snug max-w-[600px]">
                  {limpiarTexto(licitacion.Nombre)}
                </h2>
                <span className="bg-[#e8f0fe] py-1 px-4 rounded-full text-[0.85rem] text-[#1a3a5c] font-semibold whitespace-nowrap">
                  Cód: {licitacion.CodigoEstado}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Código Externo', value: licitacion.CodigoExterno },
                  { label: 'Organismo', value: limpiarTexto(licitacion.Comprador?.NombreOrganismo) },
                  { label: 'RUT Organismo', value: licitacion.Comprador?.RutUnidad },
                  { label: 'Fecha de Cierre', value: licitacion.FechaCierre?.substring(0, 10) },
                  { label: 'Fecha de Publicación', value: licitacion.FechaPublicacion?.substring(0, 10) },
                  { label: 'Tipo', value: licitacion.Tipo },
                  { label: 'Región', value: limpiarTexto(licitacion.Region) },
                ].map((item) => (
                  item.value && (
                    <div key={item.label} className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4">
                      <div className="text-[12px] font-bold tracking-[1px] uppercase text-[#E30613] mb-1">{item.label}</div>
                      <div className="text-[15px] text-[#1F1D1A] font-medium">{item.value}</div>
                    </div>
                  )
                ))}
              </div>

              {licitacion.Descripcion && (
                <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4">
                  <div className="text-[12px] font-bold tracking-[1px] uppercase text-[#E30613] mb-2">Descripción</div>
                  <p className="text-[14px] text-[#4A4845] leading-relaxed">{limpiarTexto(licitacion.Descripcion)}</p>
                </div>
              )}

              {/* Botón buscar proveedor por RUT del organismo */}
              {licitacion.Comprador?.RutUnidad && (
                <button
                  onClick={() => navigate(`/proveedores?rut=${licitacion.Comprador.RutUnidad}`)}
                  className="inline-flex items-center gap-2 bg-white border border-[#0A3D91] text-[#0A3D91] text-[14px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#EBF1FB] transition-colors self-start cursor-pointer"
                  aria-label="Buscar proveedor de esta licitación"
                >
                  Buscar proveedor
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  </svg>
                </button>
              )}

              <a href={`https://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?qs=${licitacion.CodigoExterno}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A3D91] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1756C8] transition-colors no-underline self-start"
                aria-label="Ver licitación completa en Mercado Público"
              >
                Ver en Mercado Público
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Detalle