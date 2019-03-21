'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _connection2.default.define('OrderItem', {
  note: {
    type: _sequelize2.default.STRING(255),
    allowNull: true
  },
  quantity: {
    type: _sequelize2.default.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false
});