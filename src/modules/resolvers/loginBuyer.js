import db from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE, BUYER_SCOPE } from '../../config'

export default async (obj, { email, password }, context) => {
  if (context.scope.includes('loginBuyer')) {
    try {
      //check if user exist
      let buyer = await db.models.Buyer.findOne({where: {email}})
      if (!buyer) throw new Error('User is not exist')

      //check if password same
      password = await bcrypt.hash(password, 12)
      if (password !== buyer.password) throw new Error('Password does not match')

      //OK
      return jwt.sign(
        {
          scope: BUYER_SCOPE,
          userId: buyer.id,
          userType: USER_TYPE.BUYER
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
