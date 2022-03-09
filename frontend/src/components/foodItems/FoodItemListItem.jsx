import { FaPen } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'

function FoodItemListItem({ food }) {
  const { name, calories } = food

  const editFoodItem = (e) => {}
  const deleteFoodItem = (e) => {}
  return (
    <li className='flex justify-between md:text-lg md:m-1'>
      <p>
        {name}, <em>{calories}</em>
      </p>
      <div>
        <button id='edit' className='mx-1' onClick={editFoodItem}>
          <FaPen />
        </button>
        <button id='delete' className='mx-1' onClick={deleteFoodItem}>
          <FaTimes />
        </button>
      </div>
    </li>
  )
}

export default FoodItemListItem
