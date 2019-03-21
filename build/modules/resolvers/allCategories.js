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
    if (!context.scope.includes('allCategories')) throw new Error('Permission denied');

    try {
      let restaurant_id = id;

      if (!id) {
        restaurant_id = context.user.id;
        if (context.userType !== 'Resto') throw new Error('Permission denied');
      }

      let res = (yield _models2.default.query(`
      select d.id, d.name
      from restaurants a join restaurantmenus b
      on a.id = b.restaurant_id
      join menucategories c
      on b.id = c.menu_id
      join categories d
      on c.category_id = d.id
      where a.id = ${restaurant_id}
      group by d.id
    `, {
        raw: true
      }))[0];

      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();