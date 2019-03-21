import db from '../../models'
import { JWT } from '../../config'
import jwt from 'jsonwebtoken'

// for restaurant admin only
export default async (obj, { token }, { scope }) => {
  if (token) scope = jwt.verify(token, JWT.SECRET_KEY).scope

  if (!scope.includes('markOrderAsPaid')) {
    throw new Error('Permission Denied')
  }

  try {
    const order = await db.models.Order.findOne({
      where: {
        token
      }
    })

    if (order === null) {
      throw new Error('Invalid Order ID')
    }

    order.paid = true
    await order.save()

    return order
  } catch (error) {
    throw error
  }
}
