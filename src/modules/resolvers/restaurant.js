import db from '../../models'

export default async (obj, { id }, context) => {
  if (context.scope.includes('restaurant')) {
    try {
      if (!id) {
        id = context.user.id
        if (context.userType !== 'Resto') throw new Error('Permission Denied')
      }

      return await db.models.Restaurant.findById(id)
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
