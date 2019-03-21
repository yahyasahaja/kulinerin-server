import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Seller',
  {
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    profile_picture_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
)
