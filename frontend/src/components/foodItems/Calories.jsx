import { useContext, useEffect, useState } from 'react'
import FoodContext from '../../context/food/FoodContext'

function Calories() {
  const [calories, setCalories] = useState(0)

  const { food } = useContext(FoodContext)

  useEffect(() => {
    // Reset calories to 0 and sum total calories from food array
    setCalories(0)
    food.forEach((food) =>
      setCalories((prevState) => prevState + food.calories)
    )
  }, [food])

  return (
    <h1
      className='text-2xl text-center m-3 p-4 md:text-4xl'
      style={{ borderBottom: '1px solid #c9c9c9' }}>
      Total Calories: {calories}
    </h1>
  )
}

export default Calories
