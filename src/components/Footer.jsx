import footerImg from '../assets/footer-img.png'

const Footer = () => {
  return (
    <footer className="bg-[#1F1D1A] text-white/75 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img src={footerImg} alt="LicitaSeguro" className="h-9 w-auto" />
            </div>
            <p className="text-[13px] leading-relaxed">
              Información transparente y accesible sobre licitaciones públicas de Chile,
              pensada para la ciudadanía. Basado en datos de Mercado Público y ChileCompra.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3 tracking-wide">Plataforma</h4>
            <ul className="list-none space-y-1">
              {['Licitaciones', 'Ver detalles', 'Proveedores'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3 tracking-wide">Ayuda</h4>
            <ul className="list-none space-y-1">
              {['Preguntas frecuentes', 'Contacto', 'Glosario'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accesibilidad */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3 tracking-wide">Accesibilidad</h4>
            <ul className="list-none space-y-1">
              {['Declaración WCAG 2.1', 'Transparencia', 'Ley N° 20.285'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10 pt-5 flex justify-between items-center flex-wrap gap-2 text-[12px]">
          <span>
            Datos provistos por{' '}
            <a href="https://api.mercadopublico.cl" target="_blank" rel="noopener" className="text-white/60 hover:text-white">Mercado Público</a>
            {' '}y{' '}
            <a href="https://datos-abiertos.chilecompra.cl" target="_blank" rel="noopener" className="text-white/60 hover:text-white">ChileCompra</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer