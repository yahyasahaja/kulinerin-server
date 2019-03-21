'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (obj, { email, password }) {
    try {
      const restoAdmin = yield _models2.default.models.RestaurantAdmin.findOne({
        where: { email }
      });

      if (restoAdmin === null) {
        throw new Error('No user matches with that email');
      }

      if (!(yield _bcrypt2.default.compare(password, restoAdmin.password))) {
        throw new Error('Invalid Email or Password');
      }

      yield (0, _utils.sendEmailVerification)(restoAdmin, _config.USER_TYPE.RESTAURANT);

      return _jsonwebtoken2.default.sign({
        scope: _config.RESTAURANT_SCOPE,
        userId: restoAdmin.id,
        userType: _config.USER_TYPE.RESTAURANT
      }, _config.JWT.SECRET_KEY);
    } catch (err) {
      return err;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();