import { GraphQLUpload } from 'apollo-upload-server'

//MODELS
import db from '../../models'

import allRestaurants from './allRestaurants'
import restaurant from './restaurant'
import allRestaurantMenus from './allRestaurantMenus'
import restaurantMenu from './restaurantMenu'
import allOrders from './allOrders'
import order from './order'
import allCategories from './allCategories'

import customerLogin from './customerLogin'
import customerRegister from './customerRegister'
import restaurantAdminLogin from './restaurantAdminLogin'
import addOrderItemsToOrder from './addOrderItemsToOrder'
import removeOrderItemsFromOrder from './removeOrderItemsFromOrder'
import replaceOrderItemsInOrder from './replaceOrderItemsInOrder'
import markOrderAsPaid from './markOrderAsPaid'

export default {
  Upload: GraphQLUpload,
  RestaurantAdmin: {
    restaurant: async restaurantAdmin => {
      return await restaurantAdmin.getRestaurant()
    }
  },
  Restaurant: {
    menus: async restaurant => {
      // for (let i in restaurant) if (i.indexOf('get') != -1) console.log(i)
      return await restaurant.getRestaurantMenus()
    }
  },
  RestaurantMenu: {
    categories: async restaurantMenu => {
      return await restaurantMenu.getCategories()
    }
  },
  Order: {
    restaurant: async order => {
      return await order.getRestaurant()
    },
    customer: async order => {
      let customer = await order.getCustomer()
      if (customer) return customer

      return {
        id: 0,
        name: 'Guest',
        email: ''
      }
    },
    order_items: async order => {
      return await order.getOrderItems()
    }
  },
  OrderItem: {
    restaurant_menu: async orderItem => {
      return await orderItem.getRestaurantMenu()
    }
  },
  Query: {
    allRestaurants,
    restaurant,
    allRestaurantMenus,
    restaurantMenu,
    allOrders,
    order,
    allCategories,
    uploads: () => db.models.Upload.findAll(),
  },
  Mutation: {
    customerLogin,
    customerRegister,
    restaurantAdminLogin,
    addOrderItemsToOrder,
    removeOrderItemsFromOrder,
    replaceOrderItemsInOrder,
    markOrderAsPaid
  }
}
