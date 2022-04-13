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
import { FoodProvider } from './context/food/FoodContext'
import DateListModal from './components/dates/DateListModal'

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <FoodProvider>
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
              <DateListModal />
              <Footer />
            </Router>
          </div>
        </FoodProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default App
