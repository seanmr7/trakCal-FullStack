import { useContext, useEffect } from 'react'
import { Navigate, Route } from 'react-router-dom'
import Calories from '../components/foodItems/Calories'
import ProfileContext from '../context/profile/ProfileContext'
import AuthContext from '../context/auth/AuthContext'
import FoodItemForm from '../components/foodItems/FoodItemForm'
import FoodItemList from '../components/foodItems/FoodItemList'
import FoodContext from '../context/food/FoodContext'
import ProfileForm from '../components/profile/ProfileForm'

function Home() {
  const { user } = useContext(AuthContext)
  const { getProfiles, activeProfile } = useContext(ProfileContext)
  const { getFood, setEditState } = useContext(FoodContext)

  useEffect(() => {
    if (user) {
      getProfiles(user.token)
    }
  }, [])

  // Calls getFood once an activeProfile is set
  // Sets food editing to false on profile change
  useEffect(() => {
    if (user) {
      getFood(user.token, activeProfile._id)
      setEditState(false)
    }
  }, [activeProfile])

  if (!user) {
    return <Navigate replace to='/sign-up'></Navigate>
  }

  return (
    <>
      <main className='h-full'>
        <div className='container mx-auto px-6 md:px-24'>
          {Object.keys(activeProfile).length === 0 ? (
            <ProfileForm />
          ) : (
            <FoodItemForm />
          )}
          <Calories />
          <FoodItemList />
        </div>
      </main>
    </>
  )
}

export default Home
