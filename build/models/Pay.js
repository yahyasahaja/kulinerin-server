'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _connection2.default.define('Pay', {
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  balance: {
    type: _sequelize2.default.STRING,
    allowNull: false,
    defaultValue: 0
  }
}, {
  underscored: true,
  timestamps: false
});