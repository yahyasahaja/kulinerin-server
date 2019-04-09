import db from '../../models'
import { USER_TYPE } from '../../config'

export default async (obj, { id }, context) => {
  if (context.scope.includes('seller')) {
    try {
      if (!id) {
        id = context.user.id
        if (context.userType !== USER_TYPE.SELLER) throw new Error('Permission Denied')
      }

      return await db.models.Seller.findById(id)
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
