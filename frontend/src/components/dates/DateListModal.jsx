import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import FoodContext from '../../context/food/FoodContext'
import { getDates } from '../../context/food/FoodActions'
import DateList from './DateList'

function DateListModal() {
  const { user } = useContext(AuthContext)
  const { food } = useContext(FoodContext)

  const [dates, setDates] = useState([])

  useEffect(() => {
    setDates(
      getDates(food).sort((a, b) => {
        return new Date(b) - new Date(a)
      })
    )
  }, [food])

  // Modal will not be loaded if no user is logged in
  if (!user) {
    return null
  }

  return (
    <>
      <input type='checkbox' id='dates-modal' className='modal-toggle' />
      <div className='modal h-full'>
        <div className='dates-modal modal-box w-full h-screen relavtive flex flex-col md:w-min'>
          <label
            htmlFor='dates-modal'
            className='flex w-content justify-between mb-4'>
            <h3 className='text-xl font-medium w-max mx-4'>Previous Dates</h3>
            <p className='btn btn-primary btn-circle btn-sm shadow-md text-gray-50'>
              x
            </p>
          </label>
          <DateList dates={dates} />
        </div>
      </div>
    </>
  )
}

export default DateListModal
