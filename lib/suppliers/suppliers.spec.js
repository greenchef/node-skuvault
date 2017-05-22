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
	(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/getSuppliers', {}).reply(200, function () {
		return {
			contentType: this.req.headers['content-type'],
			Suppliers: [{
				Name: 'Unknown',
				IsEnabled: true
			}, {
				Name: "Albert's Organics (CO)",
				IsEnabled: true
			}, {
				Name: 'Saputo Specialty Cheese',
				IsEnabled: true
			}, {
				Name: 'Boulder Cheese',
				IsEnabled: true
			}, {
				Name: "Jimmy's Taco Wagon",
				IsEnabled: true
			}, {
				Name: "Bob's Red Mill",
				IsEnabled: true
			}]
		};
	});
});

(0, _mocha.afterEach)(function () {
	_nock2.default.cleanAll();
});

(0, _mocha.describe)('Suppliers.find()', function () {
	(0, _mocha.it)('should get suppliers', function (done) {
		sv.suppliers.find().then(function (result) {
			(0, _chai.expect)(result).to.have.property('Suppliers').that.is.a('array');
			done();
		});
	});
});

(0, _mocha.describe)('Suppliers.find({Name: \'Boulder Cheese\'})', function () {
	(0, _mocha.it)('should find one supplier', function (done) {
		sv.suppliers.find({ Name: 'Boulder Cheese' }).then(function (result) {
			(0, _chai.expect)(result[0]).to.have.property('Name', 'Boulder Cheese');
			done();
		});
	});
});

(0, _mocha.describe)('Suppliers.find({Name: \'Not Supplier\'})', function () {
	(0, _mocha.it)('should not find hotdog', function (done) {
		sv.suppliers.find({ Name: 'Not Supplier' }).then(function (result) {
			(0, _chai.expect)(result.length, 0);
			done();
		});
	});
});

(0, _mocha.describe)('Suppliers.create({Name: \'Boulder Cheese\'})', function () {
	(0, _mocha.before)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/createSuppliers', {}).reply(400, function () {
			return { Status: 'BadRequest',
				Errors: [{
					Name: 'Boulder Cheese',
					ErrorMessages: ['Supplier already exists']
				}]
			};
		});
	});
	(0, _mocha.it)('should fail to create a supplier that exists', function (done) {
		sv.suppliers.create({ Name: 'Boulder Cheese' }).catch(function (error) {
			(0, _chai.expect)(error.response).to.have.property('statusCode', 400);
			done();
		});
	});
});