import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Buyer',
  {
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    profile_picture_url: {
      type: Sequelize.STRING(128),
      allowNull: true
    },
  },
  {
    underscored: true,
    timestamps: true
  }
)
