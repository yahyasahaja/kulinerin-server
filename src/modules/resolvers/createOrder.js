import db from '../../models'
// import { SHIPPING_COURIER } from '../../config'
import uuid from 'uuid/v1'

const {
  Order,
  // ShippingAddress,
  // OrderSeller,
  // OrderSellerItem,
} = db.models

export default async (obj, { 
  shipping_address,
}, { user, scope }) => {
  if (!scope.includes('createOrder')) throw new Error('Permission Denied')

  try {
    let cart = await user.getCart()
    // let items = await cart.getItems()

    let order = { uuid: uuid() }

    order = await Order.create(order)
    await order.createShippingAddress(shipping_address)

    // let orderSeller = 
    
    return cart
  } catch (error) {
    throw error
  }
}