import connection from './connection'
import { events, DB_CONNECTED } from '../events'

// import User from './User')
import Buyer from './Buyer'
import Seller from './Seller'
import Product from './Product'
import Order from './Order'
import OrderSeller from './OrderSeller'
import OrderSellerItem from './OrderSellerItem'
import ProductReview from './ProductReview'
import Cart from './Cart'
import CartItem from './CartItem'
import ShippingAddress from './ShippingAddress'

// associate Seller with Product
Seller.hasMany(Product, { foreignKey: 'seller_id' })
Product.belongsTo(Seller, { foreignKey: 'seller_id' })

// associate Buyer with Product through Cart
Buyer.hasOne(Cart, { foreignKey: 'buyer_id' })
Cart.belongsTo(Buyer, { foreignKey: 'buyer_id' })
Cart.belongsToMany(Product, {
  through: CartItem,
  foreignKey: 'cart_id',
  as: 'items'
})
Product.belongsToMany(Cart, {
  through: CartItem,
  foreignKey: 'product_id'
})

// associate Buyer with Product through Favorite
Buyer.belongsToMany(Product, {
  through: 'Favorites',
  foreignKey: 'buyer_id',
  as: 'favorites'
})
Product.belongsToMany(Buyer, {
  through: 'Favorites',
  foreignKey: 'product_id'
})

// associate Order with OrderSeller
Order.hasMany(OrderSeller, { foreignKey: 'order_id' })
OrderSeller.belongsTo(Order, { foreignKey: 'order_id' })

// associate OrderSeller with OrderSellerItem
OrderSeller.hasMany(OrderSellerItem, { foreignKey: 'order_seller_id' })
OrderSellerItem.belongsTo(OrderSeller, { foreignKey: 'order_seller_id' })

// associate Product with OrderSellerItem
OrderSellerItem.hasOne(Product, { foreignKey: 'product_id'})
Product.belongsTo(OrderSellerItem, { foreignKey: 'product_id' })

// associate OrderSellerItem with ProductReview
OrderSellerItem.hasOne(ProductReview, { foreignKey: 'product_review_id'})
ProductReview.belongsTo(OrderSellerItem, { foreignKey: 'product_review_id' })

// associate Order with ShippingAddress
Order.hasOne(ShippingAddress, { foreignKey: 'order_id' })
ShippingAddress.belongsTo(Order, { foreignKey: 'order_id' })

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
