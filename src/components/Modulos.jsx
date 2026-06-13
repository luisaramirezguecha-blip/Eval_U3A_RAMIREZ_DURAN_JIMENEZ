const modulos = [
  {
    title: 'Navegar licitaciones',
    desc: 'Consulta el listado actualizado de licitaciones públicas disponibles en Mercado Público.',
    link: 'Explorar',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" />,
  },
  {
    title: 'Filtrar por fecha y estado',
    desc: 'Encuentra exactamente lo que necesitas filtrando por fecha de publicación y estado actual.',
    link: 'Filtrar',
    icon: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  },
  {
    title: 'Ver detalles',
    desc: 'Accede a toda la información de cada licitación: plazos, montos, bases y documentos adjuntos.',
    link: 'Ver más',
    icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  },
  {
    title: 'Buscar proveedores por RUT',
    desc: 'Consulta información de organismos y proveedores registrados en ChileCompra usando su RUT.',
    link: 'Buscar',
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
  },
]

const Modulos = () => {
  return (
    <section section aria-labelledby="titulo-modulos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#E30613] mb-2">Plataforma</div>
          <h2 id="titulo-modulos" className="font-['Sora'] text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">¿Qué puedes hacer aquí?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modulos.map((m, i) => (
            <a key={i} href="#" aria-label={m.title} className="bg-white border border-[#0A3D91]/10 rounded-2xl p-7 flex flex-col gap-3 no-underline text-[#1F1D1A] hover:border-[#0A3D91] hover:shadow-[0_4px_20px_rgba(10,61,145,0.1)] hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 bg-[#EBF1FB] rounded-xl flex items-center justify-center text-[#0A3D91]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                  {m.icon}
                </svg>
              </div>
              <div className="font-['Sora'] text-[15px] font-semibold">{m.title}</div>
              <div className="text-[13px] text-[#4A4845] leading-relaxed">{m.desc}</div>
              <div className="text-[13px] font-semibold text-[#0A3D91] flex items-center gap-1 mt-auto">
                {m.link}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Modulos