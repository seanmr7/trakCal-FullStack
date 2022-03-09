import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

function FoodItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
  })

  const { name, calories } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div
      className='container card shadow-md bg-gray-50 p-4'
      style={{ borderRadius: '5px' }}>
      <h1 className='text-3xl mb-3'>Add Meal / Food</h1>

      <form onSubmit={onSubmit}>
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
        <button
          type='submit'
          className='btn btn-primary shadow-md text-gray-50'>
          <FaPlus style={{ marginRight: '4px' }} />
          Add Meal
        </button>
      </form>
    </div>
  )
}

export default FoodItemForm
