import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'ProductReview',
  {
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    review: {
      type: Sequelize.STRING,
      allowNull: false
    },
    buyer_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Buyers',
        key: 'id',
      },
    },
    transaction_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Transactions',
        key: 'id',
      },
    }
  },
  {
    underscored: true,
    timestamps: false,
  }
)
