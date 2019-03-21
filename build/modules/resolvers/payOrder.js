'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for restaurant admin only
exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { order_id: id }, { scope, user }) {
    if (!scope.includes('payOrder')) {
      throw new Error('Permission Denied');
    }

    try {
      const order = yield _models2.default.models.Order.findOne({
        where: {
          id
        }
      });

      if (order === null) {
        throw new Error('Invalid Order ID');
      }

      let customerPay = yield user.getPay();
      let restaurantPay = yield (yield order.getRestaurant()).getPay();
      let price = (yield order.getOrderItems()).reduce(function (acc, cur) {
        return acc + cur;
      }, 0);

      if (customerPay.balance < price) throw new Error('Balance not enough');

      //TRANSACTION
      customerPay.balance -= price;
      restaurantPay.balance += price;
      yield customerPay.save();
      yield restaurantPay.save();
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