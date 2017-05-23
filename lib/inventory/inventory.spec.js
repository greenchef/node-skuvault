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

(0, _mocha.afterEach)(function () {
	_nock2.default.cleanAll();
});

(0, _mocha.describe)('Inventory.find()', function () {
	(0, _mocha.beforeEach)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/inventory/getItemQuantities', {}).reply(200, function () {
			return {
				contentType: this.req.headers['content-type'],
				Items: [{
					AvailableQuantity: 0,
					Code: 'INV-Code',
					HeldQuantity: 0,
					LastModifiedDateTimeUtc: '0000-00-00T00:00:00.0000000Z',
					PendingQuantity: 0,
					PickedQuantity: 0,
					Sku: 'String',
					TotalOnHand: 0
				}]

			};
		});
	});
	(0, _mocha.it)('should get inventory quantities', function (done) {
		sv.inventory.find({ ProductCodes: ['INV-Code'] }).then(function (result) {
			(0, _chai.expect)(result).to.have.property('Items').that.is.a('array');
			done();
		});
	});
});

(0, _mocha.describe)('Inventory.add()', function () {
	(0, _mocha.beforeEach)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/inventory/addItem', {}).reply(200, function () {
			return {
				contentType: this.req.headers['content-type'],
				AddItemStatus: 'Success'
			};
		});
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/inventory/addItemBulk', {}).reply(200, function () {
			return {
				contentType: this.req.headers['content-type'],
				Status: 'OK'
			};
		});
	});
	(0, _mocha.it)('should add inventory', function (done) {
		sv.inventory.add({
			Code: 'String',
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			Sku: 'String',
			TenantToken: 'String',
			UserToken: 'String',
			WarehouseId: 0
		}).then(function (result) {
			(0, _chai.expect)(result).to.have.property('AddItemStatus', 'Success');
			done();
		});
	});

	(0, _mocha.it)('should add inventory bulk', function (done) {
		sv.inventory.add([{
			Code: 'String',
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			Sku: 'String',
			TenantToken: 'String',
			UserToken: 'String',
			WarehouseId: 0
		}]).then(function (result) {
			(0, _chai.expect)(result).to.have.property('Status', 'OK');
			done();
		});
	});
});

(0, _mocha.describe)('Inventory.remove()', function () {
	(0, _mocha.beforeEach)(function () {
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/inventory/removeItem', {}).reply(200, function () {
			return {
				contentType: this.req.headers['content-type'],
				RemoveItemStatus: 'Success'
			};
		});
		(0, _nock2.default)(_config.skuvault.apiUrl).post('/inventory/removeItemBulk', {}).reply(200, function () {
			return {
				contentType: this.req.headers['content-type'],
				Status: 'OK'
			};
		});
	});
	(0, _mocha.it)('should remove inventory', function (done) {
		sv.inventory.remove({
			Sku: 'String',
			Code: 'String',
			WarehouseId: 0,
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			TenantToken: 'String',
			UserToken: 'String'
		}).then(function (result) {
			(0, _chai.expect)(result).to.have.property('RemoveItemStatus', 'Success');
			done();
		});
	});

	(0, _mocha.it)('should remove inventory bulk', function (done) {
		sv.inventory.remove([{
			Sku: 'String',
			Code: 'String',
			WarehouseId: 0,
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			TenantToken: 'String',
			UserToken: 'String'
		}]).then(function (result) {
			(0, _chai.expect)(result).to.have.property('Status', 'OK');
			done();
		});
	});
});