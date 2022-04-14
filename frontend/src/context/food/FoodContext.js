import axios from 'axios'
import { createContext, useReducer } from 'react'
import foodReducer from './FoodReducer'

const FoodContext = createContext()

export const FoodProvider = ({ children }) => {
  const initialState = {
    food: [],
    activeFood: {},
    activeDate: new Date().toISOString().slice(0, 10),
    isEdit: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
  }

  const [state, dispatch] = useReducer(foodReducer, initialState)

  // Gets a profile's foods
  const getFood = async (token, profileId) => {
    setLoading()

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    if (profileId === undefined) {
      dispatch({
        type: 'DEFAULT',
      })
      return
    }
    try {
      const res = await axios.get(`/api/profiles/${profileId}/items`, config)

      dispatch({
        type: 'GET_FOOD',
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: 'IS_ERROR',
        payload: error.message,
      })
    }
  }

  // Create a new food item
  const createFood = async (foodData, token, profileId) => {
    setLoading()

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    try {
      const res = await axios.post(`/api/profiles/${profileId}/items`, foodData, config)

      dispatch({
        type: 'CREATE_FOOD',
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: 'IS_ERROR',
        payload: error.message,
      })
    }
  }

  // Edit an existing food item
  const editFood = async (id, token, profileId, itemData) => {
    setLoading()

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    const res = await axios.put(
      `/api/profiles/${profileId}/items/${id}`,
      itemData,
      config
    )

    dispatch({
      type: 'EDIT_FOOD',
      payload: res.data,
    })
  }

  // Deletes a profile
  const deleteFood = async (id, token, profileId) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }

    await axios.delete(`/api/profiles/${profileId}/items/${id}`, config)

    dispatch({
      type: 'DELETE_FOOD',
      payload: id,
    })
  }

  // Makes a food active for editing
  const makeActiveFood = (id) => {
    dispatch({
      type: 'MAKE_ACTIVE',
      payload: id,
    })
  }

  // Sets the edit state to true or false
  const setEditState = (bool) => {
    dispatch({ type: 'SET_EDIT_STATE', payload: bool })
  }

  const makeActiveDate = (date) => {
    console.log(date)
    dispatch({
      type: 'ACTIVE_DATE',
      payload: date,
    })
  }

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  return (
    <FoodContext.Provider
      value={{
        ...state,
        dispatch,
        getFood,
        createFood,
        editFood,
        deleteFood,
        makeActiveFood,
        setEditState,
        makeActiveDate,
      }}>
      {children}
    </FoodContext.Provider>
  )
}

export default FoodContext
