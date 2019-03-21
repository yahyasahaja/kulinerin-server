// import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Cart',
  { },
  {
    underscored: true,
    timestamps: true,
  }
)
