import axios from 'axios'
import { createContext, useReducer } from 'react'
import authReducer from './AuthReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Check if user exsits in local storage and confirm Bearer token is correct
  let user
  ;(async () => {
    user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      try {
        const res = await axios.get('/api/users/current-user', config)
        if (res.data.id === user._id) {
          return user
        }
      } catch (error) {
        return (user = null)
      }
    }
  })()

  const initialState = {
    user: user,
    isSuccss: false,
    isError: false,
    isAuthenticated: user ? true : false,
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

  const login = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post('/api/users/login', userData, config)

      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.response.data,
      })
      console.log(error.response.data)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        register,
        login,
        logout,
        reset,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
