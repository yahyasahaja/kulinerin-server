'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, args, context) {
    if (context.scope.includes('allOrders')) {
      try {
        // TODO:
        // 1. limit by scope (done)
        // 2. limit by context (if the user is customer, show all of
        //    his order logs) (done)
        const searchQuery = {};

        searchQuery[context.userType === _config.USER_TYPE.RESTAURANT ? 'restaurant_id' : 'customer_id'] = context.user.id;

        return yield _models2.default.models.Order.findAll({ where: searchQuery });
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Permission Denied');
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();