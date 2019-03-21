import db from '../../models'

// for restaurant admin only
export default async (obj, { order_id: id }, { scope, user }) => {
  if (!scope.includes('payOrder')) {
    throw new Error('Permission Denied')
  }

  try {
    const order = await db.models.Order.findOne({
      where: {
        id
      }
    })

    if (order === null) {
      throw new Error('Invalid Order ID')
    }

    let customerPay = await user.getPay()
    let restaurantPay = await (await order.getRestaurant()).getPay()
    let price = (await order.getOrderItems()).reduce((acc, cur) => acc + cur, 0)

    if (customerPay.balance < price) throw new Error('Balance not enough')

    //TRANSACTION
    customerPay.balance -= price
    restaurantPay.balance += price
    await customerPay.save()
    await restaurantPay.save()
    order.paid = true
    await order.save()

    return order 
  } catch (error) {
    throw error
  }
}
