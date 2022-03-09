import { useState } from 'react'
import FoodItemListItem from './FoodItemListItem'

function FoodItemList() {
  const [foodItems, setFoodItem] = useState([
    { name: 'Hamburger', calories: 500 },
    { name: 'Cookies', calories: 800 },
    { name: 'Steak Dinner', calories: 200 },
  ])
  console.log(foodItems)
  foodItems.forEach((food) => console.log(food))
  return (
    <ul id='food-list' className='m-3'>
      {foodItems.map((food, index) => (
        <FoodItemListItem key={index} food={food} />
      ))}
    </ul>
  )
}

export default FoodItemList
