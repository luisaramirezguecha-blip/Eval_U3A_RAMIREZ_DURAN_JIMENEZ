import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Detalle = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center py-32 text-center flex-1">
        <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#E30613] mb-2">Próximamente</div>
        <h1 className="font-['Sora'] text-[2rem] font-bold text-[#1F1D1A] mb-4">Detalle de Licitación</h1>
        <p className="text-[#4A4845] max-w-md">
          Esta sección está en desarrollo. Pronto podrás ver el detalle completo de cada licitación.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default Detalle