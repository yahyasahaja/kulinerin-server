'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//AUTH
let authMiddleware = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    // pre define context scope
    req.state = { scope: [] };

    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;

      if (authHeader && authHeader.length > 0) {
        const [scheme, token] = authHeader.split(' ');

        if (!/^Bearer$/i.test(scheme)) {
          res.status(401).json({
            error: 'Bad token format'
          });
        }

        const dtoken = _jsonwebtoken2.default.verify(token, _config.JWT.SECRET_KEY);

        req.state = _extends({}, req.state, dtoken);

        if (dtoken.userType === _config.USER_TYPE.RESTAURANT) req.state.user = yield _models2.default.models.RestaurantAdmin.findById(dtoken.userId);else if (dtoken.userType === _config.USER_TYPE.CUSTOMER) req.state.user = yield _models2.default.models.Customer.findById(dtoken.userId);else {
          req.state.user = {
            id: 0,
            name: _config.USER_TYPE.GUEST,
            email: ''
          };

          req.userType = _config.USER_TYPE.GUEST;
        }
      }

      yield next();
    } catch (err) {
      res.status(401).json({
        error: err.message
      });
    }
  });

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //MODULES

// import path from 'path'


//SCHEMA_RESTAURANT


//EVENTS


//DATABASE


//CONFIG


//INNER_CONFIG
const PORT = 2018;
let app = (0, _express2.default)();

//PARSER
_bodyParser2.default.urlencoded({ extended: true });

//CUSTOM_CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//COMPRESSION
app.use((0, _compression2.default)());app.use('/graphql', authMiddleware, _bodyParser2.default.json(), (0, _cors2.default)(), (0, _apolloUploadServer.apolloUploadExpress)(), (0, _expressGraphql2.default)(req => ({
  schema: _schema2.default,
  pretty: true,
  graphiql: true,
  context: _extends({
    JWT_SECRET_KEY: _config.JWT.SECRET_KEY
  }, req.state)
})));

//START_SERVER 
//LISTEN TO PORT
_events.events.on(_events.DB_CONNECTED, () => {
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
});