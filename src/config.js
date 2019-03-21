export const LOG_MODE = 'dev'

const test = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
let database
if (test) {
  database = {
    DATABASE_NAME: 'kulinerin',
    USER: 'root',
    PASSWORD: 'yahya123',
    HOST: 'localhost',
    DIALECT: 'mysql',
    PORT: 3306,
    POOL_SIZE: 10,
  }
} else database = {
  DATABASE_NAME: 'kulinerin',
  USER: 'root',
  PASSWORD: 'sansaja123',
  HOST: 'localhost',
  DIALECT: 'mysql',
  PORT: 3306,
  POOL_SIZE: 10,
}
export const DATABASE = database

export const JWT = {
  SECRET_KEY: 'iwiguhieuwghewgSansAppSansAja3528352'
}

export const USER_TYPE = {
  CUSTOMER: 'Customer',
  RESTAURANT: 'Resto',
  GUEST: 'Guest'
}

export const CUSTOMER_SCOPE = [
  'allOrders',
  'order',
  'createOrder',
  'addOrderItemsToOrder',
  'updateOrderItemInOrder',
  'removeOrderItemsFromOrder',
  'allCategories',
  'allRestaurantMenus',
  'allRestaurants',
  'customer',
  'customerLogin',
  'customerRegister',
  'verifyEmail',
  'payOrder',
  'updateCustomer',
]

export const RESTAURANT_SCOPE = [
  'allOrders',
  'order',
  'addOrderItemsToOrder',
  'updateOrderItemInOrder',
  'removeOrderItemsFromOrder',
  'allCategories',
  'allRestaurantMenus',
  'allRestaurants',
  'customer',
  'restaurantAdminLogin',
  'restaurantAdminRegister',
  'markOrderAsPaid',
  'verifyEmail',
]

export default {
  LOG_MODE,
  DATABASE,
  JWT,
  USER_TYPE,
}