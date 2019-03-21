'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//USER_SCHEMA
exports.default = _connection2.default.define('MenuCategory', {}, {
  underscored: true,
  timestamps: false
}); //MODULES
// import Sequelize from 'sequelize')