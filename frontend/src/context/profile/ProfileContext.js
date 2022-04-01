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

  // Gets a users profiles
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
      const previousActiveProfile = res.data.find(
        (profile) =>
          profile._id === JSON.parse(localStorage.getItem('activeProfile'))._id
      )

      if (previousActiveProfile === undefined) {
        return
      } else {
        makeActiveProfile(previousActiveProfile._id)
      }
    }
  }

  // Create a new profile
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

  // Edit an existing profile
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
  }

  // Deletes a profile
  const deleteProfile = async (id, token) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    await axios.delete(`api/profiles/${id}`, config)

    dispatch({
      type: 'DELETE_PROFILE',
      payload: id,
    })
  }

  // Makes a profile the active profile
  const makeActiveProfile = (id) => {
    dispatch({
      type: 'MAKE_ACTIVE',
      payload: id,
    })
  }

  // Sets the show form to true or false
  const toggleProfileForm = () => {
    dispatch({ type: 'TOGGLE_PROFILE_FORM' })
  }

  // Sets the edit state to true or false
  const setEditState = (condition) => {
    dispatch({ type: 'SET_EDIT_STATE', payload: condition })
  }

  // Commits active profile to local storage
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
        deleteProfile,
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
