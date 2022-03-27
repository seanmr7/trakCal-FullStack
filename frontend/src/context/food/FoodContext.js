import axios from 'axios'
import { createContext, useReducer } from 'react'
import foodReducer from './FoodReducer'

const FoodContext = createContext()

export const FoodProvider = ({ children }) => {
  const initialState = {
    food: [{ name: 'hamburger', calories: '500' }],
    activeFood: {},
    isEdit: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
    showProfileForm: false,
  }

  const [state, dispatch] = useReducer(foodReducer, initialState)

  // Gets a profile's foods
  const getFood = async () => {}

  // Create a new food item
  const createFood = async (foodData) => {}

  // Edit an existing food item
  const editFood = async (id, profileData) => {}

  // Deletes a profile
  const deleteFood = async (id) => {}

  // Makes a food active for editing
  const makeActiveFood = (id) => {
    dispatch({
      type: 'MAKE_ACTIVE',
      payload: id,
    })
  }

  // Sets the edit state to true or false
  const setEditState = (condition) => {
    dispatch({ type: 'SET_EDIT_STATE', payload: condition })
  }

  return (
    <FoodContext.Provider
      value={{
        ...state,
        dispatch,
      }}>
      {children}
    </FoodContext.Provider>
  )
}

export default FoodContext
