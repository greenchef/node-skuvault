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
	(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/getProducts', {}).reply(200, function () {
		return {
			contentType: this.req.headers['content-type'],
			Products: [{
				Id: '46976088',
				Code: '4046976088',
				Sku: 'G-OMN-08-00034-Y',
				PartNumber: '',
				Description: 'Sauce, Vulcano Hot',
				ShortDescription: '',
				LongDescription: '',
				Cost: 42,
				RetailPrice: 0,
				SalePrice: 0,
				WeightValue: '0',
				WeightUnit: 'lbs',
				ReorderPoint: 0,
				Brand: 'Unknown',
				Supplier: 'Unknown',
				SupplierInfo: [{
					SupplierName: 'Unknown',
					SupplierPartNumber: '',
					Cost: 0,
					LeadTime: 0,
					IsActive: false,
					IsPrimary: true
				}],
				Classification: 'Spices, Oils, & Condiments',
				QuantityOnHand: 50,
				QuantityOnHold: 0,
				QuantityPicked: 0,
				QuantityPending: 0,
				QuantityAvailable: 50,
				QuantityIncoming: 0,
				QuantityInbound: 0,
				QuantityTransfer: 0,
				QuantityInStock: 0,
				QuantityTotalFBA: 0,
				CreatedDateUtc: '2017-04-19T13:48:04.9078790Z',
				ModifiedDateUtc: '2017-04-19T13:48:04.9078790Z',
				Pictures: [],
				Attributes: [],
				VariationParentSku: '',
				IsAlternateSKU: false,
				MOQ: 0,
				MOQInfo: '',
				IncrementalQuantity: 1,
				DisableQuantitySync: false,
				Statuses: []
			}]
		};
	});
});

(0, _mocha.afterEach)(function () {
	_nock2.default.cleanAll();
});

(0, _mocha.describe)('Products.find()', function () {
	(0, _mocha.it)('should get products', function (done) {
		sv.products.find().then(function (result) {
			(0, _chai.expect)(result).to.have.property('Products').that.is.a('array');
			done();
		});
	});
});

(0, _mocha.describe)('Products.find({Sku: \'G-OMN-08-00034-Y\'})', function () {
	(0, _mocha.it)('should find one product', function (done) {
		sv.products.find({ Sku: 'G-OMN-08-00034-Y' }).then(function (result) {
			(0, _chai.expect)(result[0]).to.have.property('Sku', 'G-OMN-08-00034-Y');
			done();
		});
	});
});

(0, _mocha.describe)('Products.find({Sku: \'Hotdog\'})', function () {
	(0, _mocha.it)('should not find hotdog', function (done) {
		sv.products.find({ Sku: 'Hotdog' }).then(function (result) {
			(0, _chai.expect)(result.length, 0);
			done();
		});
	});
});

(0, _mocha.describe)('Products.create({Sku: \'G-OMN-08-00034-Y\'})', function () {
	(0, _mocha.before)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/products/createProduct', {}).reply(400, function () {
			return { Status: 'BadRequest',
				Errors: [{
					Sku: 'Lincoln',
					ErrorMessages: ['Product already exists']
				}]
			};
		});
	});
	(0, _mocha.it)('should fail to create a product that exists', function (done) {
		sv.products.create({ Sku: 'G-OMN-08-00034-Y' }).catch(function (error) {
			(0, _chai.expect)(error.response).to.have.property('statusCode', 400);
			done();
		});
	});
});