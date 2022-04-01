import { useContext, useState, useEffect } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import AuthContext from '../../context/auth/AuthContext'
import FoodContext from '../../context/food/FoodContext'
import ProfileContext from '../../context/profile/ProfileContext'

function FoodItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
  })

  const { name, calories } = formData
  const { createFood, isEdit, activeFood, editFood, setEditState } =
    useContext(FoodContext)

  const { user } = useContext(AuthContext)
  const { activeProfile } = useContext(ProfileContext)

  // Sets the form data values as the active food item if editing is true.
  // Otherwise resets the form data
  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: activeFood.name,
        calories: activeFood.calories,
      })
    } else {
      setFormData({
        name: '',
        calories: '',
      })
    }
  }, [isEdit, activeFood])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || calories === '') {
      alert('Please fill in all fields')
      return
    }

    // Create food data object with sanitized values
    const foodData = {
      name: name,
      calories: parseInt(calories),
    }

    if (isEdit) {
      editFood(activeFood._id, user.token, activeProfile._id, foodData)
    } else {
      createFood(foodData, user.token, activeProfile._id)
    }

    // Reset form values
    setFormData({
      name: '',
      calories: '',
    })
  }

  const onCancel = (e) => {
    e.preventDefault()
    setEditState(false)
  }

  return (
    <div
      className='container card shadow-md bg-gray-50 p-4'
      style={{ borderRadius: '5px' }}>
      <h1 className='text-3xl mb-3'>Add Meal / Food</h1>

      <form id='food-form' onSubmit={onSubmit}>
        <div className='flex flex-col md:flex-row'>
          <div className='form-control mb-5 md:mr-5 md:w-full'>
            <label htmlFor='name' className='label p-0 text-sm font-light'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Cookies'
              className='input input-sm'
            />
          </div>
          <div className='form-control mb-5'>
            <label htmlFor='calories' className='label p-0 text-sm font-light'>
              Calories
            </label>
            <input
              type='number'
              placeholder='500'
              id='calories'
              value={calories}
              onChange={onChange}
              className='input input-sm'
            />
          </div>
        </div>
        {isEdit ? (
          <div className='flex gap-3'>
            <button
              type='submit'
              className='btn btn-warning shadow-md text-gray-50'>
              <FaPen style={{ marginRight: '4px' }} />
              Edit
            </button>
            <button
              className='btn btn-accent shadow-md text-gray-50'
              onClick={onCancel}>
              <FaTimes style={{ marginRight: '4px' }} />
              Cancel
            </button>
          </div>
        ) : (
          <button
            type='submit'
            className='btn btn-primary shadow-md text-gray-50'>
            <FaPlus style={{ marginRight: '4px' }} />
            Add Meal
          </button>
        )}
      </form>
    </div>
  )
}

export default FoodItemForm
