import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Category',
  {
    name: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    underscored: true,
    timestamps: true
  }
)
