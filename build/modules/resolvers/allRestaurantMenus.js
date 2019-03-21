'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { restaurant_id: id }, context) {
    try {
      let restaurant_id = id || context.user.id;

      return yield _models2.default.models.RestaurantMenu.findAll({
        where: { restaurant_id }
      });
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();