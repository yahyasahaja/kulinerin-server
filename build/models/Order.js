'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _connection2.default.define('Order', {
  total_price: {
    type: _sequelize2.default.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  paid: {
    type: _sequelize2.default.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  table_number: {
    type: _sequelize2.default.INTEGER,
    allowNull: false
  },
  order_number: {
    type: _sequelize2.default.VIRTUAL,
    get: (() => {
      var _ref = _asyncToGenerator(function* () {
        try {
          const resto = yield _connection2.default.models.Restaurant.findOne({
            where: { id: this.restaurant_id }
          });
          return `${resto.name.substr(0, 2).toUpperCase()}${this.id}`;
        } catch (err) {
          return err;
        }
      });

      return function get() {
        return _ref.apply(this, arguments);
      };
    })()
  },
  token: {
    type: _sequelize2.default.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false
});