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

  const createProfile = async (profileData, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    const res = await axios.post('/api/profiles', profileData, config)

    dispatch({
      type: 'CREATE_PROFILE',
      payload: res.data,
    })
  }

  const makeActiveProfile = (id) => {
    console.log(id)
    dispatch({
      type: 'MAKE_ACTIVE',
      payload: id,
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
        createProfile,
        makeActiveProfile,
        toggleProfileForm,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
