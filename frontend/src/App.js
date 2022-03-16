import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/auth/AuthContext'
import { ProfileProvider } from './context/profile/ProfileContext'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProfileModal from './components/profile/ProfileModal'

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <div className='h-screen flex flex-col'>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/sign-up' element={<Signup />} />
              <Route path='/sign-in' element={<Signin />} />
            </Routes>
            <ProfileModal />
            <Footer />
          </Router>
        </div>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
