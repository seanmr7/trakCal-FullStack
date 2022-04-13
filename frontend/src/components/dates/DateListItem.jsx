import { useContext } from 'react'
import FoodContext from '../../context/food/FoodContext'

function DateListItem({ date }) {
  const { makeActiveDate, activeDate } = useContext(FoodContext)

  let activeClass = ''
  if (date === activeDate) {
    activeClass = 'bg-primary text-secondary'
  }

  const onClick = () => {
    makeActiveDate(date)
  }

  return (
    <li
      className={`p-2 hover:bg-primary hover:text-secondary ${activeClass}`}
      onClick={onClick}>
      {date}
    </li>
  )
}

export default DateListItem
