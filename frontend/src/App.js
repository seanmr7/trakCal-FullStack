import Home from './pages/Home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
