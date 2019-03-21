'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _connection2.default.define('RestaurantAdmin', {
  email: {
    type: _sequelize2.default.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  nin: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  address: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  phone_number: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  verification_token: {
    type: _sequelize2.default.STRING
  },
  is_verified: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  }
}, {
  underscored: true,
  timestamps: false
});