'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  DATABASE_NAME,
  DIALECT: dialect,
  HOST: host,
  PASSWORD,
  POOL_SIZE: max,
  PORT: port,
  USER
} = _config.DATABASE;

const connection = new _sequelize2.default(DATABASE_NAME, USER, PASSWORD, {
  dialect,
  host,
  port,
  logging: false,
  pool: {
    min: 1,
    max,
    acquire: 30000,
    idle: 1000
  },
  operatorsAliases: false
});

exports.default = connection;