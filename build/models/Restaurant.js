'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _connection2.default.define('Restaurant', {
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize2.default.STRING
  },
  opening_time: {
    type: _sequelize2.default.DATE
  },
  closing_time: {
    type: _sequelize2.default.DATE
  },
  is_24_hours: {
    type: _sequelize2.default.BOOLEAN
  },
  phone_number: {
    type: _sequelize2.default.INTEGER
  },
  picture: {
    type: _sequelize2.default.STRING
  },
  total_table: {
    type: _sequelize2.default.INTEGER,
    allowNull: false
  },
  slug: {
    type: _sequelize2.default.STRING,
    allowNull: false,
    unique: true
  },
  is_verified: {
    type: _sequelize2.default.BOOLEAN,
    defaultValue: false
  }
}, {
  underscored: true,
  timestamps: false
});