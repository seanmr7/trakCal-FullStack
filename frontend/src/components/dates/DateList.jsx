import DateListItem from './DateListItem'

function DateList({ dates }) {
  console.log(dates)
  return (
    <ul className='divide-y-2 divide-gray-200'>
      {dates.map((date, index) => (
        <DateListItem key={index} date={date} />
      ))}
    </ul>
  )
}

export default DateList
