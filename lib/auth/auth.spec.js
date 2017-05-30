'use strict';

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _chai = require('chai');

var _mocha = require('mocha');

var _config = require('../../config.json');

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nock2.default.disableNetConnect();

var sv = new _app.SkuVault(_config.skuvault);

(0, _mocha.beforeEach)(function () {
	(0, _nock2.default)(_config.skuvault.apiUrl).post('/getTokens', {}).reply(200, function () {
		return {
			contentType: this.req.headers['content-type'],
			TenantToken: 'String',
			UserToken: 'String'
		};
	});
});

(0, _mocha.afterEach)(function () {
	_nock2.default.cleanAll();
});

(0, _mocha.describe)('Auth.login()', function () {
	(0, _mocha.it)('should login', function (done) {
		sv.auth.login().then(function (result) {
			(0, _chai.expect)(result).to.have.property('TenantToken');
			(0, _chai.expect)(result).to.have.property('UserToken');
			done();
		});
	});
});