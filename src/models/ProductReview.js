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
  },
  {
    underscored: true,
    timestamps: false,
  }
)
