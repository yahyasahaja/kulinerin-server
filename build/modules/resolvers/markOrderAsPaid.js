'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for restaurant admin only
exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { token }, { scope }) {
    if (token) scope = _jsonwebtoken2.default.verify(token, _config.JWT.SECRET_KEY).scope;

    if (!scope.includes('markOrderAsPaid')) {
      throw new Error('Permission Denied');
    }

    try {
      const order = yield _models2.default.models.Order.findOne({
        where: {
          token
        }
      });

      if (order === null) {
        throw new Error('Invalid Order ID');
      }

      order.paid = true;
      yield order.save();

      return order;
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();