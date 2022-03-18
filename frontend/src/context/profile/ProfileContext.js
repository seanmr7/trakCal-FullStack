import axios from 'axios'
import { createContext, useReducer } from 'react'
import profileReducer from './ProfileReducer'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const initialState = {
    profiles: [],
    activeProfile: {},
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
    showProfileForm: false,
  }

  const [state, dispatch] = useReducer(profileReducer, initialState)

  const getProfiles = async (token) => {
    console.log(token)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    const res = await axios.get('/api/profiles', config)

    dispatch({
      type: 'GET_PROFILES',
      payload: res.data,
    })
  }

  const toggleProfileForm = () => {
    dispatch({ type: 'TOGGLE_PROFILE_FORM' })
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        getProfiles,
        toggleProfileForm,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
