import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/sign-in' element={<Signin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
