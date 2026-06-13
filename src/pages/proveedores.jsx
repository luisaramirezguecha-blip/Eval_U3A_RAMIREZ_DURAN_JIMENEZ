import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { validarRut } from '../hooks/useValidarRut'

const TICKET = "AC3A098B-4CD0-41AF-81A5-41284248419B"

const Proveedores = () => {
  const location = useLocation()
  const [rut, setRut] = useState('')
  const [errorRut, setErrorRut] = useState('')
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState('')
  const [proveedor, setProveedor] = useState(null)
  const [buscado, setBuscado] = useState(false)

  // Si viene con ?rut= desde Detalle, precarga el RUT
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const rutParam = params.get('rut')
    if (rutParam) {
      setRut(rutParam)
    }
  }, [location.search])

  const formatearRut = (valor) => {
    const limpio = valor.replace(/\./g, '').replace(/-/g, '').replace(/[^0-9kK]/g, '')
    if (limpio.length <= 1) return limpio
    const cuerpo = limpio.slice(0, -1)
    const dv = limpio.slice(-1)
    const cuerpoFormato = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `${cuerpoFormato}-${dv}`
  }

  const handleRutChange = (e) => {
    const formateado = formatearRut(e.target.value)
    setRut(formateado)
    if (errorRut) setErrorRut('')
  }

  const buscarProveedor = async () => {
    const { valido, mensaje } = validarRut(rut)
    if (!valido) {
      setError('Error de conexión con Mercado Público. Intente nuevamente.')
      return
    }

    setErrorRut('')
    setLoader(true)
    setError('')
    setProveedor(null)
    setBuscado(false)

    try {
      const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&ticket=${TICKET}`
      const resp = await fetch(url)

      if (resp.status === 404) {
        setError('No se encontró proveedor para el RUT ingresado.')
        return
      }

      if (!resp.ok) throw new Error(`Error del servidor ${resp.status}`)

      const datos = await resp.json()

      if (!datos.listaEmpresa || datos.listaEmpresa.length === 0) {
        setError('No se encontró proveedor para el RUT ingresado.')
        return
      }

      setProveedor(datos.listaEmpresa[0])
    } catch (err) {
      console.error(err)
      setError('Error de conexión con Mercado Público. Intente nuevamente.')
    } finally {
      setLoader(false)
      setBuscado(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') buscarProveedor()
  }

  return (
    <>
      <Navbar />
      <main id="contenido-principal" className="py-10 min-h-[70vh] bg-[#f8fafc] flex-1">
        <div className="max-w-[900px] mx-auto px-4">

          <h1 id="titulo-pagina" className="text-[1.6rem] font-bold text-[#1a3a5c] mb-2">
            Buscar Proveedor
          </h1>
          <p className="text-[#4A4845] text-[0.9rem] mb-5">
            Ingresa el RUT del organismo o proveedor para obtener su información registrada en ChileCompra.
          </p>

          {/* Formulario */}
          <section
            role="search"
            aria-labelledby="titulo-pagina"
            className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.07)] mb-5"
          >
            <div className="flex flex-wrap gap-4 items-end" role="group" aria-label="Formulario de búsqueda de proveedor">

              <div className="flex-[1_1_260px]">
                <label htmlFor="rutProveedor" className="block font-bold text-[0.9rem] text-[#111827] mb-[0.3rem]">
                  RUT del proveedor:
                </label>
                <input
                  id="rutProveedor"
                  name="rutProveedor"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md text-[0.95rem] outline-none box-border transition-all
                    ${errorRut
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-[#d1d5db] focus:border-[#1a3a5c] focus:ring-1 focus:ring-[#1a3a5c]'
                    }`}
                  placeholder="Ej: 12.345.678-9"
                  value={rut}
                  onChange={handleRutChange}
                  onKeyDown={handleKeyDown}
                  aria-describedby="ayuda-rut error-rut"
                  aria-invalid={!!errorRut}
                  tabIndex={0}
                />
                <span id="ayuda-rut" className="text-[12px] text-[#6b7280] mt-1 block">
                  Puedes encontrar el RUT en el detalle de una licitación.
                </span>
                {errorRut && (
                  <span
                    id="error-rut"
                    role="alert"
                    aria-live="assertive"
                    className="text-[12px] text-red-600 font-semibold mt-1 block"
                  >
                    ⚠ {errorRut}
                  </span>
                )}
              </div>

              <div className="flex-[0_0_120px]">
                <button
                  onClick={buscarProveedor}
                  className="w-full bg-[#1a3a5c] text-white border-none rounded-md py-[0.55rem] px-4 font-bold text-[0.95rem] cursor-pointer hover:bg-[#122a44] transition-colors"
                  aria-label="Buscar proveedor por RUT"
                  tabIndex={0}
                >
                  Buscar
                </button>
              </div>

            </div>
          </section>

          {/* Loader */}
          {loader && (
            <div aria-live="polite" aria-busy="true" className="text-[#1a3a5c] font-bold mb-3">
              Buscando proveedor...
            </div>
          )}

          {/* Error API */}
          {error && (
            <div role="alert" aria-live="assertive" className="text-red-600 font-bold mb-3">
              {error}
            </div>
          )}

          {/* Resultado */}
          {proveedor && !loader && (
            <section
              className="bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-6"
              role="region"
              aria-label="Resultado de búsqueda de proveedor"
            >
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#E30613] mb-4">
                Proveedor encontrado
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Nombre Empresa', value: proveedor.NombreEmpresa || '--' },
                  { label: 'Código Empresa', value: proveedor.CodigoEmpresa || '--' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4">
                    <div className="text-[12px] font-bold tracking-[1px] uppercase text-[#E30613] mb-1">{item.label}</div>
                    <div className="text-[15px] text-[#1F1D1A] font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sin resultados */}
          {buscado && !proveedor && !error && !loader && (
            <div role="status" aria-live="polite" className="text-center text-[#4A4845] py-12">
              No se encontraron resultados para el RUT ingresado.
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default Proveedores 