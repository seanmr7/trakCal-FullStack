import { useContext } from 'react'
import FoodContext from '../../context/food/FoodContext'
import FoodItemListItem from './FoodItemListItem'
import { filterByDate } from '../../context/food/FoodActions'

function FoodItemList() {
  const { food, activeDate } = useContext(FoodContext)

  return (
    <ul id='food-list' className='m-3'>
      {filterByDate(food, activeDate).map((foodItem) => (
        <FoodItemListItem key={foodItem._id} food={foodItem} />
      ))}
    </ul>
  )
}

export default FoodItemList
