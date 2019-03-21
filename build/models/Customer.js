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

exports.default = _connection2.default.define('Customer', {
  email: {
    type: _sequelize2.default.STRING(128),
    allowNull: false,
    unique: true
  },
  name: {
    type: _sequelize2.default.STRING(64),
    allowNull: false
  },
  password: {
    type: _sequelize2.default.STRING(128),
    allowNull: false
  },
  profile_picture: {
    type: _sequelize2.default.STRING(128),
    allowNull: true
  },
  verification_token: {
    type: _sequelize2.default.STRING
  },
  is_verified: {
    type: _sequelize2.default.VIRTUAL,
    get: (() => {
      var _ref = _asyncToGenerator(function* () {
        return !!this.verification_token;
      });

      return function get() {
        return _ref.apply(this, arguments);
      };
    })()
  }
}, {
  underscored: true,
  timestamps: false
});