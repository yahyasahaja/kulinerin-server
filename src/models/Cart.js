import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Cart',
  {
    promotionCode: {
      type: Sequelize.STRING,
    }
  },
  {
    underscored: true,
    timestamps: true,
  }
)
