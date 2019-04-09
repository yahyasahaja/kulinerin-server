import db from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT, USER_TYPE, BUYER_SCOPE } from '../../config'

export default async (obj, { input }, context) => {
  if (context.scope.includes('loginBuyer')) {
    try {
      let { email, password, ...res } = input
      
      //check if user exist
      let buyer = await db.models.Buyer.findOne({where: {email}})
      if (buyer) throw new Error('User is already exist')

      //check if password same
      password = await bcrypt.hash(password, 12)
      buyer = {
        email,
        password,
        ...res
      }

      buyer = await db.models.Buyer.create(buyer)
      await buyer.createCart()

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
