'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

var _events = require('../events');

var _Customer = require('./Customer');

var _Customer2 = _interopRequireDefault(_Customer);

var _Category = require('./Category');

var _Category2 = _interopRequireDefault(_Category);

var _OrderItem = require('./OrderItem');

var _OrderItem2 = _interopRequireDefault(_OrderItem);

var _Order = require('./Order');

var _Order2 = _interopRequireDefault(_Order);

var _RestaurantMenu = require('./RestaurantMenu');

var _RestaurantMenu2 = _interopRequireDefault(_RestaurantMenu);

var _RestaurantAdmin = require('./RestaurantAdmin');

var _RestaurantAdmin2 = _interopRequireDefault(_RestaurantAdmin);

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

var _SocialMedia = require('./SocialMedia');

var _SocialMedia2 = _interopRequireDefault(_SocialMedia);

var _Pay = require('./Pay');

var _Pay2 = _interopRequireDefault(_Pay);

require('./MenuCategory');

require('./Upload');

var _seeders = require('../seeders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import User from './User')


// associate Restaurant with RestaurantMenu
_Restaurant2.default.hasMany(_RestaurantMenu2.default, { foreignKey: 'restaurant_id' });
_RestaurantMenu2.default.belongsTo(_Restaurant2.default, { foreignKey: 'restaurant_id' });

// associate RestaurantAdmin with Restaurant
_RestaurantAdmin2.default.belongsTo(_Restaurant2.default, { foreignKey: 'restaurant_id' });
_Restaurant2.default.hasOne(_RestaurantAdmin2.default, { foreignKey: 'restaurant_id' });

// associate Restaurant with Pay
_Pay2.default.hasOne(_Restaurant2.default, { foreignKey: 'pay_id' });
_Restaurant2.default.belongsTo(_Pay2.default, { foreignKey: 'pay_id' });

// associate Customer with Pay
_Pay2.default.hasOne(_Customer2.default, { foreignKey: 'pay_id' });
_Customer2.default.belongsTo(_Pay2.default, { foreignKey: 'pay_id' });

// associate SocialMedia with Restaurant
_SocialMedia2.default.hasOne(_Restaurant2.default, { foreignKey: 'soscial_media_id' });
_Restaurant2.default.belongsTo(_SocialMedia2.default, { foreignKey: 'social_media_id' });

// associate RestaurantMenu with Category
_RestaurantMenu2.default.belongsToMany(_Category2.default, {
  through: 'MenuCategory',
  foreignKey: 'menu_id',
  as: 'categories'
});
_Category2.default.belongsToMany(_RestaurantMenu2.default, {
  through: 'MenuCategory',
  foreignKey: 'category_id'
});

// associate OrderItem with RestaurantMenu
_RestaurantMenu2.default.hasOne(_OrderItem2.default, { foreignKey: 'menu_id' });
_OrderItem2.default.belongsTo(_RestaurantMenu2.default, {
  foreignKey: 'menu_id',
  as: 'restaurant_menu'
});

// associate Order with Restaurant, Customer, OrderItem
_Order2.default.belongsTo(_Restaurant2.default, { foreignKey: 'restaurant_id', as: 'restaurant' });
_Restaurant2.default.hasMany(_Order2.default, { foreignKey: 'restaurant_id' });
_Order2.default.belongsTo(_Customer2.default, { foreignKey: 'customer_id', as: 'customer' });
_Customer2.default.hasMany(_Order2.default, { foreignKey: 'customer_id' });
_Order2.default.hasMany(_OrderItem2.default, { foreignKey: 'order_id', as: 'order_items' });
_OrderItem2.default.belongsTo(_Order2.default, { foreignKey: 'order_id' });

let force = true;

_connection2.default.sync({
  force
}).then(_asyncToGenerator(function* () {
  console.log('database synchronized');

  _events.events.emit(_events.DB_CONNECTED);
  if (force) (0, _seeders.giveSeeds)();
})).catch(err => {
  console.log(err);
});

exports.default = _connection2.default;