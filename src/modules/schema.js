import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

import resolvers from './resolvers'

const typeDefs = gql`
  scalar Upload

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

  enum Status {
    PENDING
    SHIPPING
    COMPLETED
    EXPIRED
  }

  type Cart {
    id: ID!
    items: [TransactionItem!]!
  }

  type TransactionItem {
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

  type Transaction {
    id: ID!
    uuid: String!
    total_price: Int!
    status: Status!
    address: ShippingAddress!
    buyer: Buyer!
    seller: Seller!
    items: [TransactionItem!]!
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

  type Query {
    #BUYER
    "get buyer by id or using buyer token"
    buyer(id: ID): Buyer

    "get buyer's transaction list. buyer token required"
    buyerTransactions: [Transactions]

    "get a buyer's transaction using id. buyer token required"
    buyerTransaction(id: ID!): [Transactions]

    "get buyer's cart. Buyer token required"
    cart: Cart

    #SELLER
    "get seller by id or using seller token"
    seller(id: ID): Seller

    "get seller's transaction list. seller token required"
    sellerTransactions: [Transactions]

    "get a seller's transaction using id. seller token required"
    sellerTransaction(id: ID!): [Transactions]

    "get a seller's transaction using id. seller token required"
    sellerProducts: [Product]

    "get statistics"
    sellerTransactionStatistics: [Int]

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
    buyerLogin(email: String, password: String): String
    
    "buyer register"
    buyerRegister(email: String, password: String): String

    "update buyer profile. buyer token required"
    updateBuyer(input: UpdateBuyerInput): String

    "create transaction"
    createTransaction(itemIds: [ID!]!): String

    #SELLER
    "seller login"
    sellerLogin(email: String, password: String): String
    
    "buyer register"
    buyerRegister(email: String, password: String): String

    "update seller profile. seller token required"
    updateSeller(input: UpdateSellerInput): String

    "confirm transaction by id or uuid"
    confirmTransaction(id: ID, uuid: String): String

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
