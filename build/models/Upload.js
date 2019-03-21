'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _connection2.default.define('Upload', {
  file_name: {
    type: _sequelize2.default.STRING
  },
  mime_type: {
    type: _sequelize2.default.STRING
  },
  encoding: {
    type: _sequelize2.default.STRING
  },
  path: {
    type: _sequelize2.default.STRING
  }
}, {
  underscored: true,
  timestamps: false
});