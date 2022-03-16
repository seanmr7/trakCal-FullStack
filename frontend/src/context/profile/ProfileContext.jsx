import axios from 'axios'
import { createContext, useReducer } from 'react'
import profileReducer from './ProfileReducer'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const initialState = {
    showProfileForm: false,
  }

  const [state, dispatch] = useReducer(profileReducer, initialState)

  const toggleProfileForm = () => {
    dispatch({ type: 'TOGGLE_PROFILE_FORM' })
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        toggleProfileForm,
      }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
