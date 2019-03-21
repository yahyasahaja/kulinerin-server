'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LOG_MODE = exports.LOG_MODE = 'dev';

const test = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);
let database;
if (test) {
  database = {
    DATABASE_NAME: 'sansapp',
    USER: 'root',
    PASSWORD: 'yahya123',
    HOST: 'localhost',
    DIALECT: 'mysql',
    PORT: 3306,
    POOL_SIZE: 10
  };
} else database = {
  DATABASE_NAME: 'sansapp',
  USER: 'root',
  PASSWORD: 'sansaja123',
  HOST: 'localhost',
  DIALECT: 'mysql',
  PORT: 3306,
  POOL_SIZE: 10
};
const DATABASE = exports.DATABASE = database;

const JWT = exports.JWT = {
  SECRET_KEY: 'iwiguhieuwghewgSansAppSansAja3528352'
};

const USER_TYPE = exports.USER_TYPE = {
  CUSTOMER: 'Customer',
  RESTAURANT: 'Resto',
  GUEST: 'Guest'
};

const CUSTOMER_SCOPE = exports.CUSTOMER_SCOPE = ['allOrders', 'order', 'createOrder', 'addOrderItemsToOrder', 'updateOrderItemInOrder', 'removeOrderItemsFromOrder', 'allCategories', 'allRestaurantMenus', 'allRestaurants', 'customer', 'customerLogin', 'customerRegister', 'verifyEmail', 'payOrder', 'updateCustomer'];

const RESTAURANT_SCOPE = exports.RESTAURANT_SCOPE = ['allOrders', 'order', 'addOrderItemsToOrder', 'updateOrderItemInOrder', 'removeOrderItemsFromOrder', 'allCategories', 'allRestaurantMenus', 'allRestaurants', 'customer', 'restaurantAdminLogin', 'restaurantAdminRegister', 'markOrderAsPaid', 'verifyEmail'];

exports.default = {
  LOG_MODE,
  DATABASE,
  JWT,
  USER_TYPE
};