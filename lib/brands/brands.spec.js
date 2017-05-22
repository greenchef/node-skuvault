'use strict';

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _chai = require('chai');

var _mocha = require('mocha');

var _config = require('../../config.json');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nock2.default.disableNetConnect();

var sv = new _app2.default(_config.skuvault);

(0, _mocha.beforeEach)(function () {
	(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/getBrands', {}).reply(200, function () {
		return {
			contentType: this.req.headers['content-type'],
			Brands: [{
				Name: 'Generic',
				IsEnabled: true
			}, {
				Name: 'Lincoln',
				IsEnabled: true
			}, {
				Name: 'Tides',
				IsEnabled: true
			}]
		};
	});
});

(0, _mocha.afterEach)(function () {
	_nock2.default.cleanAll();
});

(0, _mocha.describe)('Brands.find()', function () {
	(0, _mocha.it)('should get brands', function (done) {
		sv.brands.find().then(function (result) {
			(0, _chai.expect)(result).to.have.property('Brands').that.is.a('array');
			done();
		});
	});
});

(0, _mocha.describe)('Brands.find({Name: \'Generic\'})', function () {
	(0, _mocha.it)('should get one brand', function (done) {
		sv.brands.find({ Name: 'Generic' }).then(function (result) {
			(0, _chai.expect)(result[0]).to.have.property('Name', 'Generic');
			done();
		});
	});
});

(0, _mocha.describe)('Brands.find({Name: \'NotGeneric\'})', function () {
	(0, _mocha.it)('should not find brand', function (done) {
		sv.brands.find({ Name: 'NotGeneric' }).then(function (result) {
			(0, _chai.expect)(result.length, 0);
			done();
		});
	});
});

(0, _mocha.describe)('Brands.create({Name: \'Lincoln\'})', function () {
	(0, _mocha.before)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/createBrands', {}).reply(400, function () {
			return { Status: 'BadRequest',
				Errors: [{
					BrandName: 'Lincoln',
					ErrorMessages: ['Brand name already exists']
				}]
			};
		});
	});
	(0, _mocha.it)('should fail to create a brand that exists', function (done) {
		sv.brands.create({ Brands: [{ Name: 'Lincoln' }] }).catch(function (error) {
			(0, _chai.expect)(error.response).to.have.property('statusCode', 400);
			done();
		});
	});
});