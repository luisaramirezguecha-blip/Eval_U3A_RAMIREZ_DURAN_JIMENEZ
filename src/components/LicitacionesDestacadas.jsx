import { useState } from 'react'
import { Link } from 'react-router-dom'

const licitaciones = [
  { title: 'Construcción de ciclovía — Santiago', org: 'Municipalidad de Santiago', monto: '$ 95.000.000', plazo: 'Cierra en 8 días', estado: 'Abierta' },
  { title: 'Suministro de medicamentos — CENABAST', org: 'CENABAST', monto: '$ 340.000.000', plazo: 'Cierra en 3 días', estado: 'Abierta' },
  { title: 'Servicio de aseo — Edificio MINSAL', org: 'Ministerio de Salud', monto: '$ 28.000.000', plazo: 'Abre en 2 días', estado: 'Por abrir' },
  { title: 'Equipamiento laboratorio — USACH', org: 'Universidad de Santiago', monto: '$ 67.000.000', plazo: 'Cerrada', estado: 'Cerrada' },
  { title: 'Mantención ascensores — Metro', org: 'Metro de Santiago', monto: '$ 210.000.000', plazo: 'Cierra en 15 días', estado: 'Abierta' },
  { title: 'Consultoría TI — SII', org: 'Servicio de Impuestos Internos', monto: '$ 45.000.000', plazo: 'Cerrada', estado: 'Cerrada' },
]

const badgeStyle = {
  'Abierta':   'bg-[#E7F6ED] text-[#166534]',
  'Por abrir': 'bg-[#FFF4E5] text-[#92400E]',
  'Cerrada':   'bg-[#F3F3F3] text-[#555]',
}

const LicitacionesDestacadas = () => {
  const [filtro, setFiltro] = useState('Todas')
  const filtros = ['Todas', 'Abiertas', 'Por abrir', 'Cerradas']

  const filtradas = licitaciones.filter(l => {
    if (filtro === 'Todas') return true
    if (filtro === 'Abiertas') return l.estado === 'Abierta'
    if (filtro === 'Por abrir') return l.estado === 'Por abrir'
    if (filtro === 'Cerradas') return l.estado === 'Cerrada'
  })

  return (
    <section aria-labelledby="titulo-licitaciones" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#E30613] mb-2">Destacadas</div>
          <h2 id="titulo-licitaciones" className="font-['Sora'] text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">Licitaciones disponibles</h2>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              aria-label={`Filtrar por: ${f}`}
              className={`text-[13px] px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${
                filtro === f
                  ? 'border-[#0A3D91] text-[#0A3D91] bg-[#EBF1FB]'
                  : 'border-[#0A3D91]/10 bg-white text-[#4A4845] hover:bg-[#EBF1FB] hover:border-[#0A3D91] hover:text-[#0A3D91]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtradas.map((l, i) => (
            <article key={i} aria-label={`Licitación: ${l.title}`} className="bg-[#F5F7FC] border border-[#0A3D91]/10 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-[0_6px_24px_rgba(10,61,145,0.1)] hover:-translate-y-0.5 transition-all">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-[15px] font-semibold text-[#1F1D1A] leading-snug">{l.title}</h3>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${badgeStyle[l.estado]}`}>
                  {l.estado}
                </span>
              </div>
              <p className="text-[13px] text-[#4A4845]">{l.org}</p>
              <div className="flex justify-between items-center pt-3 border-t border-[#0A3D91]/10">
                <span className="font-['Sora'] text-[15px] font-bold text-[#0A3D91]">{l.monto}</span>
                <span className="text-[12px] text-[#4A4845]">{l.plazo}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/licitaciones" className="inline-flex items-center gap-2 bg-[#0A3D91] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1756C8] transition-colors no-underline">
            Ver todas las licitaciones
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LicitacionesDestacadas