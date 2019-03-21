'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const typeDefs = _graphqlTag2.default`
  scalar Upload

  type RestaurantMenu {
    id: ID!
    name: String!
    description: String
    price: Int!
    image: String!
    categories: [Category!]!
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String!
    opening_time: String!
    closing_time: String!
    is_24_hours: String!
    phone_number: String!
    total_tables: String!
    menus: [RestaurantMenu!]!
    picture: String
    slug: String!
  }

  type RestaurantAdmin {
    id: ID!
    email: String!
    restaurant: Restaurant!
    nin: String!
    address: String!
    phone_number: String!
  }

  type Customer {
    id: ID!
    email: String!
    name: String!
    profile_picture: String
  }

  type OrderItem {
    id: ID!
    restaurant_menu: RestaurantMenu!
    quantity: Int!
    notes: String
  }

  type Order {
    id: ID!
    total_price: Int!
    table_number: Int
    restaurant: Restaurant!
    customer: Customer!
    order_items: [OrderItem!]!
    paid: Boolean!
    order_number: String!
  }

  type Category {
    id: Int!
    name: String!
  }

  input OrderItemInput {
    menu_id: ID!
    quantity: Int!
    note: String!
  }

  input OrderInput {
    id: ID!
    table_number: Int!
  }

  input UpdateCustomerInput {
    email: String
    name: String
  }

  input UpdateRestaurantInput {
    name: String
    description: String
    opening_time: String
    closing_time: String
    is_24_hours: String
    phone_number: String
    total_tables: String
    picture: String
    slug: String
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    "get all restaurants"
    allRestaurants: [Restaurant!]!

    "get restaurant by id or using restaurant admin token"
    restaurant(id: ID): Restaurant

    "get restaurant admin by id or using restaurant admin token"
    restaurantAdmin(id: ID): RestaurantAdmin

    "get all restaurant menu from a restaurant"
    allRestaurantMenus(restaurant_id: ID): [RestaurantMenu!]!

    "get single restaurant menu from a restaurant"
    restaurantMenu(id: ID!): RestaurantMenu

    "get all orders"
    allOrders: [Order!]!

    "get detailed order"
    order(id: ID!): Order

    "get customer by id or using customer token"
    customer(id: ID): Customer!

    "get all categories by restaurant id"
    allCategories(restaurant_id: ID): [Category!]!

    #UPLOADS
    uploads: [File]
  }

  "mutation"
  type Mutation {
    #CUSTOMER
    "customer login and get user token"
    customerLogin(email: String!, password: String!): String!

    "customer registration and get user token"
    customerRegister(
      email: String!
      password: String!
      name: String!
    ): String!

    "update customer profile"
    updateCustomer(input: UpdateCustomerInput!): String!

    "verify email verification token"
    verifyCustomerToken(token: String): Customer

    #RESTAURANT ADMIN
    "restaurant admin login, and get user token"
    restaurantAdminLogin(email: String!, password: String!): String!

    "update Restaurant Admin"
    updateRestaurantAdmin(input: UpdateCustomerInput!): RestaurantAdmin

    "verify email verification token"
    verifyRestaurantAdminToken(token: String): RestaurantAdmin

    #RESTAURANT
    updateRestaurant(input: UpdateRestaurantInput!): Restaurant

    #"verify email verification token"
    #verifyRestaurant(token: String!): Restaurant

    #TRANSACTION
    "create a new order"
    createOrder(restaurant_id: ID!): Order
    
    "mark order as paid (for restaurant admin)"
    markOrderAsPaid(token: ID!): Order

    "add order item to order (for restaurant admin)"
    addOrderItemsToOrder(token: String!, order_items: [OrderItemInput!]!): Order

    "remove order item to order (for restaurant admin)"
    removeOrderItemsFromOrder(token: String!, order_item_ids: [ID!]!): Order

    "update order item to order (for restaurant admin)"
    replaceOrderItemsInOrder(token: String!, order_items: [OrderItemInput!]!): Order

    "pay order using T-Pay"
    payOrder(order_id: ID!): Order

    #UPLOADS
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]!
  }
`;

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers: _resolvers2.default });