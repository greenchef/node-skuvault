'use strict';
import nock from 'nock';
import {expect} from 'chai';
import {beforeEach, afterEach, describe, it} from 'mocha';
import {SkuVault} from '../app';
import config from '../../config.json';

nock.disableNetConnect();

var sv = new SkuVault(config);

afterEach(() => {
	nock.cleanAll();
});

describe('Inventory.find()', () => {
	beforeEach(() => {
		nock(config.apiUrl)
			.post('/inventory/getItemQuantities', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					Items: [
						{
							AvailableQuantity: 0,
							Code: 'INV-Code',
							HeldQuantity: 0,
							LastModifiedDateTimeUtc: '0000-00-00T00:00:00.0000000Z',
							PendingQuantity: 0,
							PickedQuantity: 0,
							Sku: 'String',
							TotalOnHand: 0
						}
					]

				};
			});
	});
	it('should get inventory quantities', (done) => {
		sv.inventory.find({ProductCodes: ['INV-Code']})
		.then(result => {
			expect(result).to.have.property('Items').that.is.a('array');
			done();
		});
	});
});

describe('Inventory.add()', () => {
	beforeEach(() => {
		nock(config.apiUrl)
			.post('/inventory/addItem', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					AddItemStatus: 'Success'
				};
			});
		nock(config.apiUrl)
			.post('/inventory/addItemBulk', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					Status: 'OK'
				};
			});
	});
	it('should add inventory', (done) => {
		sv.inventory.add({
			Code: 'String',
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			Sku: 'String',
			TenantToken: 'String',
			UserToken: 'String',
			WarehouseId: 0
		})
		.then(result => {
			expect(result).to.have.property('AddItemStatus', 'Success');
			done();
		});
	});

	it('should add inventory bulk', (done) => {
		sv.inventory.add([{
			Code: 'String',
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			Sku: 'String',
			TenantToken: 'String',
			UserToken: 'String',
			WarehouseId: 0
		}])
		.then(result => {
			expect(result).to.have.property('Status', 'OK');
			done();
		});
	});
});

describe('Inventory.remove()', () => {
	beforeEach(() => {
		nock(config.apiUrl)
			.post('/inventory/removeItem', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					RemoveItemStatus: 'Success'
				};
			});
		nock(config.apiUrl)
			.post('/inventory/removeItemBulk', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					Status: 'OK'
				};
			});
	});
	it('should remove inventory', (done) => {
		sv.inventory.remove({
			Sku: 'String',
			Code: 'String',
			WarehouseId: 0,
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			TenantToken: 'String',
			UserToken: 'String'
		})
		.then(result => {
			expect(result).to.have.property('RemoveItemStatus', 'Success');
			done();
		});
	});

	it('should remove inventory bulk', (done) => {
		sv.inventory.remove([{
			Sku: 'String',
			Code: 'String',
			WarehouseId: 0,
			LocationCode: 'String',
			Quantity: 0,
			Reason: 'String',
			TenantToken: 'String',
			UserToken: 'String'
		}])
		.then(result => {
			expect(result).to.have.property('Status', 'OK');
			done();
		});
	});
});
