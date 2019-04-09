import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

import resolvers from './resolvers'

const typeDefs = gql`
  #SCALAR
  scalar Upload
  scalar Date

  #ENUM
  enum Status {
    UNPAID
    PAID
    PROGRESS
    COMPLETED
    EXPIRED
  }

  enum ShippingCourier {
    JNE
    GRAB
  }

  #TYPE
  type Buyer {
    id: ID!
    name: String!
    email: String!
    profile_picture_url: String!
    cart: Cart
  }

  type Seller {
    id: ID!
    name: String!
    email: String!
    profile_picture_url: String!
    address: String
  }

  type Cart {
    id: ID!
    items: [OrderItem!]!
  }

  type OrderItem {
    id: ID!
    product: Product!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    image_url: String!
    description: String!
    stock: Int!
    category: Category!
  }

  type Category {
    name: String!
  }

  type ShippingAddress {
    address: String!
    phont_number: String!
    recipient_name: String!
    zip_code: String!
  }

  type Order {
    id: ID!
    uuid: String!
    total_price: Int!
    status: Status!
    address: ShippingAddress!
    shipping_courier: ShippingCourier!
    buyer: Buyer!
    seller: Seller!
    items: [OrderItem!]!
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  #INPUT
  input ProductInput {
    name: String
    price: Int
    image_url: String
    description: String
    stock: Int
  }

  input UpdateBuyerInput {
    name: String
    email: String
    profile_picture_url: Int
  }

  input UpdateSellerInput {
    name: String!
    email: String!
    profile_picture_url: String!
    address: String
  }

  input RegisterBuyerInput {
    name: String!
    email: String!
    password: String!
    profile_picture_url: Int
  }

  input RegisterSellerInput {
    name: String!
    email: String!
    password: String!
    address: String!
    profile_picture_url: Int
  }

  input ShippingAddressInput {
    address: String!
    phont_number: String!
    recipient_name: String!
    zip_code: String!
  }

  type Query {
    #BUYER
    "get buyer by id or using buyer token"
    buyer(id: ID): Buyer

    "get buyer's order list. buyer token required"
    buyerOrders: [Order]

    "get a buyer's order using id. buyer token required"
    buyerOrder(id: ID!): [Order]

    "get buyer's cart. Buyer token required"
    cart: Cart

    #SELLER
    "get seller by id or using seller token"
    seller(id: ID): Seller

    "get seller's order list. seller token required"
    sellerOrders: [Order]

    "get a seller's order using id. seller token required"
    sellerOrder(id: ID!): [Order]

    "get a seller's order using id. seller token required"
    sellerProducts: [Product]

    "get statistics"
    sellerOrderStatistics(start: Date, end: Date): [Int]

    #ANOTHER
    "get all categories"
    categories: [Category]

    "get all products"
    allProducts: [Product]

    #UPLOADS
    uploads: [File]
  }

  "mutation"
  type Mutation {
    #BUYER
    "buyer login"
    loginBuyer(email: String!, password: String!): String
    
    "buyer register"
    registerBuyer(input: RegisterBuyerInput!): String

    "update buyer profile. buyer token required"
    updateBuyer(input: UpdateBuyerInput!): String

    "create order"
    createOrder(
      shipping_courier: ShippingCourier!,
      shipping_address: ShippingAddressInput!, 
      item_ids: [ID!]!
    ): Order

    #SELLER
    "seller login"
    loginSeller(email: String!, password: String!): String
    
    "seller register"
    registerSeller(input: RegisterSellerInput): String

    "update seller profile. seller token required"
    updateSeller(input: UpdateSellerInput!): String

    "confirm order by id or uuid"
    confirmOrder(id: ID, uuid: String): String

    "add product"
    addProduct(input: ProductInput!): Product

    "update product"
    updateProduct(id: ID!, input: ProductInput!): Product

    "delete product"
    deleteProduct(id: ID!): String

    #UPLOADS
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]!
  }
`

export default makeExecutableSchema({ typeDefs, resolvers })
