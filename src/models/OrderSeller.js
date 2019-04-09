import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'OrderSeller',
  {
    status: {
      type: Sequelize.ENUM({
        values: ['UNPAID', 'PAID', 'PROGRESS', 'COMPLETED', 'EXPIRED']
      }),
      allowNull: false,
      defaultValue: 'UNPAID'
    },
    courier: {
      type: Sequelize.ENUM({
        values: ['JNE', 'GRAB']
      }),
      allowNull: false,
    },
    shippingCost: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
)
