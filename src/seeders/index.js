//MODULES
import bcrypt from 'bcrypt'

//DATABASE
// import db from '../db'

//MODELS
import db from '../models/connection'

const {
  Buyer,
  Seller,
  Cart,
} = db.models

//SEEDS
import buyers from './buyers'
import sellers from './sellers'

//SEEDERS
export const giveSeeds = async () => {
  let loc
  loc
  //ADD RESTAURANT SEEDS 
  await Cart.destroy({ where: {}, force: true })
  await Buyer.destroy({ where: {}, force: true })
  for (let buyer of buyers)
    buyer.password = await bcrypt.hash(buyer.password, 12)
  loc = await Buyer.bulkCreate(buyers)

  for (let attr in loc[0]) {
    if (attr.indexOf('get') === 0) {
      console.log(attr)
    }
  }
  // console.log(loc[0])
  for (let buyer of loc) await buyer.createCart()
  let buyer = loc[0]
  let cart = await buyer.getCart()
  for (let attr in cart) {
    if (attr.indexOf('Items') !== -1) {
      console.log(attr)
    }
  }
  console.log(await cart.getItems())

  //ADD RESTAURANT SEEDS
  await Seller.destroy({ where: {}, force: true })
  for (let seller of sellers)
    seller.password = await bcrypt.hash(seller.password, 12)
  loc = await Seller.bulkCreate(sellers)
 
  // await Category.destroy({ where: {}, force: true })
  // await Category.bulkCreate(categories)

  // await RestaurantMenu.destroy({ where: {}, force: true })
  // loc = await RestaurantMenu.bulkCreate(restaurant_menu)

  // await MenuCategory.destroy({ where: {}, force: true })
  // await MenuCategory.bulkCreate(menu_categories)
}

export default {
  giveSeeds,
}