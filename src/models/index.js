import connection from './connection'
import { events, DB_CONNECTED } from '../events'

// import User from './User')
import Buyer from './Buyer'
import Seller from './Seller'
import Product from './ProductReview'
import Transaction from './Transaction'
import ProductReview from './ProductReview'

// associate Seller with Product
Seller.hasMany(Product, { foreignKey: 'seller_id' })
Product.belongsTo(Seller, { foreignKey: 'seller_id' })

// associate Buyer with Product through Cart
Buyer.belongsToMany(Product, {
  through: 'Carts',
  foreignKey: 'buyer_id',
  // as: 'carts'
})
Product.belongsToMany(Buyer, {
  through: 'Carts',
  foreignKey: 'product_id'
})

// associate Buyer with Product through Favorite
Buyer.belongsToMany(Product, {
  through: 'Favorites',
  foreignKey: 'buyer_id',
  // as: 'carts'
})
Product.belongsToMany(Buyer, {
  through: 'Favorites',
  foreignKey: 'product_id'
})

// associate Transaction with Product throguh TransactionItem
Transaction.belongsToMany(Product, {
  through: 'TransactionItems',
  foreignKey: 'transaction_id',
  // as: 'items'
})
Product.belongsToMany(Transaction, {
  through: 'TransactionItems',
  foreignKey: 'product_id'
})

// associate Transaction with Product throguh ProductReviews
Transaction.belongsToMany(Product, {
  through: ProductReview,
  foreignKey: 'transaction_id',
})
Product.belongsToMany(Transaction, {
  through: ProductReview,
  foreignKey: 'product_id',
})

import { giveSeeds } from '../seeders'

let force = true

connection
  .sync({
    force
  })
  .then(async () => {
    console.log('database synchronized')

    events.emit(DB_CONNECTED)
    if (force) giveSeeds()
  })
  .catch(err => {
    console.log(err)
  })
  
export default connection
