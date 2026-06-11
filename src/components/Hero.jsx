import { useState } from 'react'

const Hero = () => {
  const [query, setQuery] = useState('')

  const quickTags = ['Salud', 'Educación', 'Obras', 'Tecnología', 'Mi región']

  const heroCards = [
    { title: 'Mejoramiento de plaza pública — Maipú', sub: 'Municipalidad de Maipú · $ 48.000.000', badge: 'Abierta', badgeClass: 'bg-[#E7F6ED] text-[#166534]' },
    { title: 'Suministro de insumos — Hospital Regional', sub: 'Servicio de Salud · $ 120.000.000', badge: 'Por abrir', badgeClass: 'bg-[#FFF4E5] text-[#92400E]' },
    { title: 'Adquisición de equipos TI — MINEDUC', sub: 'Ministerio de Educación · $ 85.000.000', badge: 'Abierta', badgeClass: 'bg-[#E7F6ED] text-[#166534]' },
  ]

  return (
    <section className="bg-white py-20 border-b border-[#0A3D91]/10 overflow-hidden relative">
      {/* Circulo decorativo */}
      <div className="absolute -top-20 -right-24 w-[500px] h-[500px] rounded-full bg-[#EBF1FB] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* Texto izquierda */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBF1FB] text-[#0A3D91] text-[13px] font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-[#E30613] flex-shrink-0" />
              Plataforma oficial · Mercado Público
            </div>

            <h1 className="font-['Sora'] text-[clamp(2rem,4vw,2.9rem)] font-bold leading-tight tracking-tight text-[#1F1D1A] mb-4">
              Encuentra <em className="not-italic text-[#0A3D91]">licitaciones</em><br />
              públicas de forma<br />simple y transparente
            </h1>

            <p className="text-[#4A4845] text-[1.05rem] max-w-[500px] mb-8">
              Busca por palabra, organismo o región. Sin trámites complicados,
              con información clara y accesible para todos los ciudadanos.
            </p>

            {/* Search box */}
            <div className="flex bg-[#F5F7FC] border-[1.5px] border-[#0A3D91]/10 rounded-xl overflow-hidden mb-4 focus-within:border-[#0A3D91] focus-within:shadow-[0_0_0_3px_rgba(10,61,145,0.12)] transition-all">
              <div className="flex items-center px-4 text-[#4A4845]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Ej.: "construcción de áreas verdes, Valparaíso"'
                className="flex-1 border-none bg-transparent py-4 text-base text-[#1F1D1A] outline-none placeholder:text-[#9a9895]"
              />
              <button className="bg-[#0A3D91] text-white px-6 text-[15px] font-semibold hover:bg-[#1756C8] transition-colors min-h-[54px]">
                Buscar
              </button>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2">
              {quickTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-[13px] px-3 py-1.5 border border-[#0A3D91]/10 rounded-full bg-white text-[#4A4845] hover:bg-[#EBF1FB] hover:border-[#0A3D91] hover:text-[#0A3D91] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjetas decorativas */}
          <div className="bg-gradient-to-br from-[#EBF1FB] to-white border border-[#0A3D91]/10 rounded-2xl p-6">
            {heroCards.map((card, i) => (
              <div key={i} className="bg-white border border-[#0A3D91]/10 rounded-xl p-4 mb-3 last:mb-0 flex justify-between items-start gap-4 hover:shadow-[0_4px_20px_rgba(10,61,145,0.08)] transition-shadow">
                <div>
                  <div className="text-[14px] font-semibold text-[#1F1D1A] mb-1">{card.title}</div>
                  <div className="text-[13px] text-[#4A4845]">{card.sub}</div>
                </div>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${card.badgeClass}`}>
                  {card.badge}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero