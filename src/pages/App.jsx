import Header from '../components/Header'
import Book from '../components/Book'
import About from '../components/About'
import Galeri from '../components/Galeri'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import '../App.css'
import SocialIcons from '../components/SocialIcons'
import Mitra from '../components/Mitra'
import Fasilitas from '../components/Fasilitas'

function App() {


  return (
    <>
      <Header/>
      <Book/>
      <About/>
      <Fasilitas/>
      <Galeri/>
      <Mitra/>
     <Contact/>
     <Footer/>

     <SocialIcons/>
    </>
  )
}

export default App
