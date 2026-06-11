import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ComoFunciona from '../components/ComoFunciona'
import LicitacionesDestacadas from '../components/LicitacionesDestacadas'
import Modulos from '../components/Modulos'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <main id="contenido-principal">
        <Hero />
        <ComoFunciona />
        <LicitacionesDestacadas />
        <Modulos />
      </main>
      <Footer />
    </>
  )
}

export default Home