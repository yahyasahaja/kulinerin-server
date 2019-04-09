import Sequelize from 'sequelize'
import connection from './connection'

export default connection.define(
  'Order',
  {
    status: {
      type: Sequelize.ENUM({
        values: ['UNPAID', 'PAID', 'PROGRESS', 'COMPLETED', 'EXPIRED']
      }),
      allowNull: false,
      defaultValue: 'UNPAID'
    },
    uuid: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    // order_number: {
    //   type: Sequelize.VIRTUAL,
    //   get: async function() {
    //     try {
    //       const resto = await connection.models.Restaurant.findOne({
    //         where: { id: this.restaurant_id }
    //       })
    //       return `${resto.name.substr(0, 2).toUpperCase()}${this.id}`
    //     } catch (err) {
    //       return err
    //     }
    //   },
    // },
  },
  {
    underscored: true,
    timestamps: true
  }
)
