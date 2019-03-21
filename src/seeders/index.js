//MODULES
import bcrypt from 'bcrypt'

//DATABASE
// import db from '../db'

//MODELS
import db from '../models/connection'

const {
  Buyer,
  Seller,
} = db.models

//SEEDS
import buyers from './buyers'
import sellers from './sellers'

//SEEDERS
export const giveSeeds = async () => {
  let loc
  loc
  //ADD RESTAURANT SEEDS
  await Buyer.destroy({ where: {}, force: true })
  for (let buyer of buyers)
    buyer.password = await bcrypt.hash(buyer.password, 12)
  loc = await Buyer.bulkCreate(buyers)

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