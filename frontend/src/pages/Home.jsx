import FoodItemForm from '../components/foodItems/FoodItemForm'
import FoodItemList from '../components/foodItems/FoodItemList'

function Home() {
  return (
    <>
      <main className='h-full'>
        <div className='container mx-auto px-6 md:px-24'>
          <FoodItemForm />
          <FoodItemList />
        </div>
      </main>
    </>
  )
}

export default Home
