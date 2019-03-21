'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloUploadServer = require('apollo-upload-server');

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _allRestaurants = require('./allRestaurants');

var _allRestaurants2 = _interopRequireDefault(_allRestaurants);

var _restaurant = require('./restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

var _allRestaurantMenus = require('./allRestaurantMenus');

var _allRestaurantMenus2 = _interopRequireDefault(_allRestaurantMenus);

var _restaurantMenu = require('./restaurantMenu');

var _restaurantMenu2 = _interopRequireDefault(_restaurantMenu);

var _allOrders = require('./allOrders');

var _allOrders2 = _interopRequireDefault(_allOrders);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _allCategories = require('./allCategories');

var _allCategories2 = _interopRequireDefault(_allCategories);

var _customerLogin = require('./customerLogin');

var _customerLogin2 = _interopRequireDefault(_customerLogin);

var _customerRegister = require('./customerRegister');

var _customerRegister2 = _interopRequireDefault(_customerRegister);

var _restaurantAdminLogin = require('./restaurantAdminLogin');

var _restaurantAdminLogin2 = _interopRequireDefault(_restaurantAdminLogin);

var _addOrderItemsToOrder = require('./addOrderItemsToOrder');

var _addOrderItemsToOrder2 = _interopRequireDefault(_addOrderItemsToOrder);

var _removeOrderItemsFromOrder = require('./removeOrderItemsFromOrder');

var _removeOrderItemsFromOrder2 = _interopRequireDefault(_removeOrderItemsFromOrder);

var _replaceOrderItemsInOrder = require('./replaceOrderItemsInOrder');

var _replaceOrderItemsInOrder2 = _interopRequireDefault(_replaceOrderItemsInOrder);

var _markOrderAsPaid = require('./markOrderAsPaid');

var _markOrderAsPaid2 = _interopRequireDefault(_markOrderAsPaid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//MODELS


exports.default = {
  Upload: _apolloUploadServer.GraphQLUpload,
  RestaurantAdmin: {
    restaurant: (() => {
      var _ref = _asyncToGenerator(function* (restaurantAdmin) {
        return yield restaurantAdmin.getRestaurant();
      });

      return function restaurant(_x) {
        return _ref.apply(this, arguments);
      };
    })()
  },
  Restaurant: {
    menus: (() => {
      var _ref2 = _asyncToGenerator(function* (restaurant) {
        // for (let i in restaurant) if (i.indexOf('get') != -1) console.log(i)
        return yield restaurant.getRestaurantMenus();
      });

      return function menus(_x2) {
        return _ref2.apply(this, arguments);
      };
    })()
  },
  RestaurantMenu: {
    categories: (() => {
      var _ref3 = _asyncToGenerator(function* (restaurantMenu) {
        return yield restaurantMenu.getCategories();
      });

      return function categories(_x3) {
        return _ref3.apply(this, arguments);
      };
    })()
  },
  Order: {
    restaurant: (() => {
      var _ref4 = _asyncToGenerator(function* (order) {
        return yield order.getRestaurant();
      });

      return function restaurant(_x4) {
        return _ref4.apply(this, arguments);
      };
    })(),
    customer: (() => {
      var _ref5 = _asyncToGenerator(function* (order) {
        let customer = yield order.getCustomer();
        if (customer) return customer;

        return {
          id: 0,
          name: 'Guest',
          email: ''
        };
      });

      return function customer(_x5) {
        return _ref5.apply(this, arguments);
      };
    })(),
    order_items: (() => {
      var _ref6 = _asyncToGenerator(function* (order) {
        return yield order.getOrderItems();
      });

      return function order_items(_x6) {
        return _ref6.apply(this, arguments);
      };
    })()
  },
  OrderItem: {
    restaurant_menu: (() => {
      var _ref7 = _asyncToGenerator(function* (orderItem) {
        return yield orderItem.getRestaurantMenu();
      });

      return function restaurant_menu(_x7) {
        return _ref7.apply(this, arguments);
      };
    })()
  },
  Query: {
    allRestaurants: _allRestaurants2.default,
    restaurant: _restaurant2.default,
    allRestaurantMenus: _allRestaurantMenus2.default,
    restaurantMenu: _restaurantMenu2.default,
    allOrders: _allOrders2.default,
    order: _order2.default,
    allCategories: _allCategories2.default,
    uploads: () => _models2.default.models.Upload.findAll()
  },
  Mutation: {
    customerLogin: _customerLogin2.default,
    customerRegister: _customerRegister2.default,
    restaurantAdminLogin: _restaurantAdminLogin2.default,
    addOrderItemsToOrder: _addOrderItemsToOrder2.default,
    removeOrderItemsFromOrder: _removeOrderItemsFromOrder2.default,
    replaceOrderItemsInOrder: _replaceOrderItemsInOrder2.default,
    markOrderAsPaid: _markOrderAsPaid2.default
  }
};