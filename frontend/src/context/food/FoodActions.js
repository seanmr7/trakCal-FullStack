export const getDates = (foodArray) => {
  let dates = []

  foodArray.forEach((food) => {
    const date = food.createdAt.split('T')[0]
    if (!dates.includes(date)) {
      dates.push(date)
    }
  })

  return dates
}

export const filterByDate = (foodArray, date) => {
  return foodArray.filter((food) => {
    const createdAt = food.createdAt.split('T')[0]
    if (createdAt === date) {
      return food
    } else {
      return false
    }
  })
}
