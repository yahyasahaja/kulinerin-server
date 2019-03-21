'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

//AUTH
var authMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, scheme, token, dtoken;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // pre define context scope
            req.state = { scope: [] };

            _context.prev = 1;
            authHeader = req.headers.authorization || req.headers.Authorization;

            if (!(authHeader && authHeader.length > 0)) {
              _context.next = 22;
              break;
            }

            _authHeader$split = authHeader.split(' '), _authHeader$split2 = _slicedToArray(_authHeader$split, 2), scheme = _authHeader$split2[0], token = _authHeader$split2[1];

            if (!/^Bearer$/i.test(scheme)) {
              res.status(401).json({
                error: 'Bad token format'
              });
            }

            dtoken = _jsonwebtoken2.default.verify(token, _config.JWT.SECRET_KEY);

            req.state = _extends({}, req.state, dtoken);

            if (!(dtoken.userType === _config.USER_TYPE.RESTAURANT)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return _models2.default.models.RestaurantAdmin.findById(dtoken.userId);

          case 11:
            req.state.user = _context.sent;
            _context.next = 22;
            break;

          case 14:
            if (!(dtoken.userType === _config.USER_TYPE.CUSTOMER)) {
              _context.next = 20;
              break;
            }

            _context.next = 17;
            return _models2.default.models.Customer.findById(dtoken.userId);

          case 17:
            req.state.user = _context.sent;
            _context.next = 22;
            break;

          case 20:
            req.state.user = {
              id: 0,
              name: _config.USER_TYPE.GUEST,
              email: ''
            };

            req.userType = _config.USER_TYPE.GUEST;

          case 22:
            _context.next = 24;
            return next();

          case 24:
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context['catch'](1);

            res.status(401).json({
              error: _context.t0.message
            });

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 26]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

//GRAPHQL


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _apolloUploadServer = require('apollo-upload-server');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./modules/schema');

var _schema2 = _interopRequireDefault(_schema);

var _events = require('./events');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _config = require('./config');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
} //MODULES

// import path from 'path'


//SCHEMA_RESTAURANT


//EVENTS


//DATABASE


//CONFIG


//INNER_CONFIG
var PORT = 5000;
var app = (0, _express2.default)();

//PARSER
_bodyParser2.default.urlencoded({ extended: true });

//CUSTOM_CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//COMPRESSION
app.use((0, _compression2.default)());app.use('/graphql', authMiddleware, _bodyParser2.default.json(), (0, _cors2.default)(), (0, _apolloUploadServer.apolloUploadExpress)(), (0, _expressGraphql2.default)(function (req) {
  return {
    schema: _schema2.default,
    pretty: true,
    graphiql: true,
    context: _extends({
      JWT_SECRET_KEY: _config.JWT.SECRET_KEY
    }, req.state)
  };
}));

//START_SERVER 
//LISTEN TO PORT
_events.events.on(_events.DB_CONNECTED, function () {
  app.listen(PORT, function () {
    return console.log('Server running at port ' + PORT);
  });
});