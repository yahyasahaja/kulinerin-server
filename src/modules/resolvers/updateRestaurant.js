// import db from '../../models'

export default async (obj, { input }, { scope, user }) => {
  if (scope.includes('updateRestaurantAdmin')) {
    try {
      let restaurant = await user.getRestaurant()

      for (let key in input) restaurant[key] = input[key]

      return await restaurant.save()
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
