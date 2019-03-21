import db from '../../models'

export default async (obj, { id }, context) => {
  if (context.scope.includes('order')) 
    throw new Error('Permission Denied')

  try {
    return await db.models.Order.findById(id)
  } catch (error) {
    throw error
  }
}
