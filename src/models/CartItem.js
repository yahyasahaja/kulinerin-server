import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'CartItem',
  {
    quantity: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    }
  },
  {
    underscored: true,
    timestamps: true,
  }
)
