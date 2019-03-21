'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import db from '../../models'

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { input }, { scope, user }) {
    if (scope.includes('updateRestaurantAdmin')) {
      try {
        if (input.email) user.verification_token = null;

        for (let key in input) user[key] = input[key];

        return yield user.save();
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