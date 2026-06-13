const steps = [
  { num: 1, title: 'Busca', desc: 'Escribe lo que necesitas y filtra por región, organismo o categoría temática.' },
  { num: 2, title: 'Revisa', desc: 'Lee plazos, montos y requisitos en lenguaje claro. Sin jerga técnica innecesaria.' },
  { num: 3, title: 'Postula', desc: 'Sube tu oferta paso a paso usando tu ClaveÚnica. Te guiamos en cada etapa.' },
]

const ComoFunciona = () => {
  return (
    <section aria-labelledby="titulo-como-funciona" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#E30613] mb-2">Proceso</div>
          <h2 id="titulo-como-funciona" className="font-['Sora'] text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">¿Cómo funciona? En 3 pasos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <article key={step.num} className="bg-white border border-[#0A3D91]/10 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#0A3D91] text-white font-['Sora'] text-xl font-bold flex items-center justify-center mb-5">
                {step.num}
              </div>
              <h3 className="font-['Sora'] text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-[14px] text-[#4A4845] leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComoFunciona