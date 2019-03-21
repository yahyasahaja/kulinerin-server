import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'ShippingAddress',
  {
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(15),
      allowNull: false
    },
    recipient_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zip_code: {
      type: Sequelize.STRING(10),
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: true,
  }
)
