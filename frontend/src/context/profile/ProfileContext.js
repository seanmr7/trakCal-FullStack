import axios from 'axios'
import { createContext, useReducer } from 'react'
import profileReducer from './ProfileReducer'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const initialState = {
    profiles: [],
    activeProfile: {},
    isEdit: false,
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

    if (localStorage.getItem('activeProfile')) {
      const previousActiveProfile = JSON.parse(
        localStorage.getItem('activeProfile')
      )
      makeActiveProfile(previousActiveProfile._id)
    }
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

  const editProfile = async (id, profileData, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
    const res = await axios.put(`/api/profiles/${id}`, profileData, config)

    dispatch({
      type: 'EDIT_PROFILE',
      payload: res.data,
    })

    console.log('Edit inside context')
  }

  const makeActiveProfile = (id) => {
    dispatch({
      type: 'MAKE_ACTIVE',
      payload: id,
    })
  }

  const toggleProfileForm = () => {
    dispatch({ type: 'TOGGLE_PROFILE_FORM' })
  }

  const setEditState = (condition) => {
    dispatch({ type: 'SET_EDIT_STATE', payload: condition })
  }

  const setLocalStorage = (profile) => {
    localStorage.setItem('activeProfile', JSON.stringify(profile))
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        getProfiles,
        createProfile,
        editProfile,
        makeActiveProfile,
        toggleProfileForm,
        setEditState,
        setLocalStorage,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
