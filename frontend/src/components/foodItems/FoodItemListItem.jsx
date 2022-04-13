import { useContext } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import AuthContext from '../../context/auth/AuthContext'
import FoodContext from '../../context/food/FoodContext'

function FoodItemListItem({ food }) {
  const { name, calories, _id, profile, createdAt } = food
  const { user } = useContext(AuthContext)
  const { deleteFood, makeActiveFood, setEditState, activeDate } =
    useContext(FoodContext)

  const editFoodItem = (e) => {
    makeActiveFood(_id)
    setEditState(true)
    console.log(e.target.id)
  }

  const deleteFoodItem = (e) => {
    if (e.target.id === 'delete') {
      deleteFood(_id, user.token, profile)
    }
  }

  if (createdAt.split('T')[0] === new Date().toISOString().slice(0, 10)) {
  }

  return (
    <li className='flex justify-between md:text-lg md:m-1'>
      <p>
        {name}, <em>{calories}</em>
      </p>
      {createdAt.split('T')[0] === new Date().toISOString().slice(0, 10) ? (
        <div className='flex gap-x-3 justify-center content-center items-center'>
          <button id='edit' onClick={editFoodItem}>
            <FaPen style={{ pointerEvents: 'none' }} />
          </button>
          <button id='delete' onClick={deleteFoodItem}>
            <FaTimes style={{ pointerEvents: 'none' }} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </li>
  )
}

export default FoodItemListItem
