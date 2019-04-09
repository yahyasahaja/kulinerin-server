import db from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE, SELLER_SCOPE } from '../../config'

export default async (obj, { email, password }, context) => {
  if (context.scope.includes('loginSeller')) {
    try {
      //check if user exist
      let seller = await db.models.Seller.findOne({where: {email}})
      if (!seller) throw new Error('User is not exist')

      //check if password same
      password = await bcrypt.hash(password, 12)
      if (password !== seller.password) throw new Error('Password does not match')

      //OK
      return jwt.sign(
        {
          scope: SELLER_SCOPE,
          userId: seller.id,
          userType: USER_TYPE.SELLER
        },
        JWT.SECRET_KEY
      )
    } catch (error) {
      throw error
    }
  } else {
    throw new Error('Permission Denied')
  }
}
