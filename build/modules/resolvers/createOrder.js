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

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { restaurant_id }, { userType, user }) {
    try {
      let order = {
        restaurant_id
      };

      if (userType === _config.USER_TYPE.CUSTOMER) order.customer_id = user.id;

      order.token = _jsonwebtoken2.default.sign({
        scope: ['allOrders', 'addOrderItemsToOrder', 'removeOrderItemsFromOrder', 'replaceOrderItemsInOrder'],
        userId: user.id,
        userType: userType
      }, _config.JWT.SECRET_KEY);

      return yield _models2.default.models.Order.create(order);
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();