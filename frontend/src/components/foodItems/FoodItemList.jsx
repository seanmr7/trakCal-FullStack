import { useContext } from 'react'
import FoodContext from '../../context/food/FoodContext'
import FoodItemListItem from './FoodItemListItem'

function FoodItemList() {
  const { food } = useContext(FoodContext)

  return (
    <ul id='food-list' className='m-3'>
      {food.map((foodItem) => (
        <FoodItemListItem key={foodItem._id} food={foodItem} />
      ))}
    </ul>
  )
}

export default FoodItemList
