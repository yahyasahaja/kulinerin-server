import { GraphQLUpload } from 'apollo-upload-server'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

//MODELS
import db from '../../models'

import buyer from './buyer'
import seller from './seller'

import loginBuyer from './loginBuyer'
import registerBuyer from './registerBuyer'
import createOrder from './createOrder'
import loginSeller from './loginSeller'
import registerSeller from './registerSeller'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      
      return null
    },
  }),
  Upload: GraphQLUpload,
  
  Query: {
    buyer,
    seller,
    uploads: () => db.models.Upload.findAll(),
  },
  Mutation: {
    loginBuyer,
    loginSeller,
    registerBuyer,
    registerSeller,
    createOrder,
  }
}
