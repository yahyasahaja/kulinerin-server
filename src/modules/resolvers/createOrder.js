import db from '../../models'
import { JWT, USER_TYPE } from '../../config'
import jwt from 'jsonwebtoken'

export default async (obj, { restaurant_id }, { userType, user }) => {
  try {
    let order = {
      restaurant_id
    }

    if (userType === USER_TYPE.CUSTOMER) order.customer_id = user.id

    order.token = jwt.sign(
      {
        scope: [
          'allOrders',
          'addOrderItemsToOrder',
          'removeOrderItemsFromOrder',
          'replaceOrderItemsInOrder',
        ],
        userId: user.id,
        userType: userType,
      },
      JWT.SECRET_KEY
    )

    return await db.models.Order.create(order)
  } catch (error) {
    throw error
  }
}