import db from '../../models'

export default async (obj, { verification_token }, context) => {
  if (context.scope.includes('customer')) {
    try {
      let user = await db.models.Customer.findOne({
        where: {
          verification_token
        }
      })

      return user
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
