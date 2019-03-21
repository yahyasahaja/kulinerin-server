import { JWT, USER_TYPE, CUSTOMER_SCOPE } from '../../config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../../models'

export default async (obj, { email, password }) => {
  try {
    const customer = await db.models.Customer.findOne({ where: { email } })

    if (!customer) throw new Error('No user matches with that email')

    if (!await bcrypt.compare(password, customer.password)) {
      throw new Error('Invalid Password')
    }
    
    return jwt.sign(
      {
        scope: CUSTOMER_SCOPE,
        userId: customer.id,
        userType: USER_TYPE.CUSTOMER
      },
      JWT.SECRET_KEY
    )
  } catch (err) {
    throw err
  }
}
