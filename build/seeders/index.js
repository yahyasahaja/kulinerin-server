'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.giveSeeds = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _connection = require('../models/connection');

var _connection2 = _interopRequireDefault(_connection);

var _restaurants = require('./restaurants.js');

var _restaurants2 = _interopRequireDefault(_restaurants);

var _restaurant_menu = require('./restaurant_menu.js');

var _restaurant_menu2 = _interopRequireDefault(_restaurant_menu);

var _categories = require('./categories.js');

var _categories2 = _interopRequireDefault(_categories);

var _menu_categories = require('./menu_categories.js');

var _menu_categories2 = _interopRequireDefault(_menu_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //MODULES


//DATABASE
// import db from '../db'

//MODELS


const {
  Restaurant,
  RestaurantMenu,
  // Order,
  Category,
  MenuCategory
} = _connection2.default.models;

//SEEDS


//SEEDERS
const giveSeeds = exports.giveSeeds = (() => {
  var _ref = _asyncToGenerator(function* () {
    let loc;
    loc;
    //ADD RESTAURANT SEEDS
    yield Restaurant.destroy({ where: {}, force: true });
    for (let restaurant of _restaurants2.default) restaurant.password = yield _bcrypt2.default.hash(restaurant.password, 12);
    loc = yield Restaurant.bulkCreate(_restaurants2.default);

    yield Category.destroy({ where: {}, force: true });
    yield Category.bulkCreate(_categories2.default);

    yield RestaurantMenu.destroy({ where: {}, force: true });
    loc = yield RestaurantMenu.bulkCreate(_restaurant_menu2.default);

    yield MenuCategory.destroy({ where: {}, force: true });
    yield MenuCategory.bulkCreate(_menu_categories2.default);
  });

  return function giveSeeds() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = {
  giveSeeds
};