import axios from 'axios'
import { createContext, useReducer } from 'react'
import authReducer from './AuthReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const initialState = {
    user: user ? user : null,
    isError: false,
    isAuthenticated: false,
    isLoading: false,
    message: '',
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const register = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post('/api/users', userData, config)

      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      dispatch({
        type: 'REGISTER_USER',
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.response.data,
      })
      console.log(error.response.data)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
