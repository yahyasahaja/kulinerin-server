'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUpload = exports.storeFS = exports.sendEmailVerification = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//CONFIG
const uploadDir = './uploads';
_mkdirp2.default.sync(uploadDir);

//UTILS
const transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'takisinaja@gmail.com',
    pass: 'takis123'
  }
});

const sendEmailVerification = exports.sendEmailVerification = (() => {
  var _ref = _asyncToGenerator(function* (user, userType) {
    let { name, id: userId, email } = user;
    let token = _jsonwebtoken2.default.sign({
      userId,
      userType,
      email
    }, _config.JWT.SECRET_KEY);

    user.verification_token = token;
    yield user.save();

    let domain = `${userType === _config.USER_TYPE.CUSTOMER ? '' : 'mitra'}.ngopi.men`;
    let link = `https://${domain}/token/${token}`;

    const mailOptions = {
      from: 'takisinaja@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
      <h1>Hi ${name}, welcome to Takis</h1>
      <p>To verify your email, please click the Verify Email bellow</p>
      <div style="margin-top: 38px;
      margin-bottom: 8px;" >
      <a style="padding: 10px 20px;
      border-radius: 10px;
      color: white;
      background: #00BCD4;
      text-decoration: none;" href=${link}>Verify Email</a>
      </div>
      <br />
      <p>or if it is not working you can just copy this link and paste it into your browser</p>
      ${link}
    `
    };

    return yield new Promise(function (resolve, reject) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info.response);
        }
      });
    });
  });

  return function sendEmailVerification(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const storeFS = exports.storeFS = ({ stream, filename }) => {
  const id = _shortid2.default.generate();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) => stream.on('error', error => {
    if (stream.truncated)
      // Delete the truncated file
      _fs2.default.unlinkSync(path);
    reject(error);
  }).pipe(_fs2.default.createWriteStream(path)).on('error', error => reject(error)).on('finish', () => resolve({ id, path })));
};

const processUpload = exports.processUpload = (() => {
  var _ref2 = _asyncToGenerator(function* (upload) {
    const { stream, filename, mimetype, encoding } = yield upload;
    const { id, path } = yield storeFS({ stream, filename });
    return yield _models2.default.models.Uploads.create({ id, filename, mimetype, encoding, path });
  });

  return function processUpload(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = {
  sendEmailVerification,
  storeFS,
  processUpload
};