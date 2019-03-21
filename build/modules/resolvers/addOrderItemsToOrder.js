'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { token, order_items }, { scope, userType }) {
    if (token && userType === _config.USER_TYPE.GUEST) scope = _jsonwebtoken2.default.verify(token, _config.JWT.SECRET_KEY).scope;

    if (!scope.includes('addOrderItemsToOrder')) {
      throw new Error('Permission Denied');
    }

    try {
      const order = yield _models2.default.models.Order.findById({ where: { token } });

      if (order === null) {
        throw new Error('Invalid Order ID');
      }

      return yield _models2.default.models.OrderItem.bulkCreate(order_items.map(function (d) {
        return _extends({ order_id: order.id }, d);
      }));
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();