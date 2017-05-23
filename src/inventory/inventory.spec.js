'use strict';
import nock from 'nock';
import {expect} from 'chai';
import {beforeEach, afterEach, describe, it} from 'mocha';
import {skuvault} from '../../config.json';
import SkuVault from '../app';

nock.disableNetConnect();

var sv = new SkuVault(skuvault);

afterEach(() => {
	nock.cleanAll();
});

describe('Inventory.add()', () => {
	beforeEach(() => {
		nock(skuvault.apiUrl)
			.post('/products/addItem', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					AddItemStatus: 'Success'
				};
			});
		nock(skuvault.apiUrl)
			.post('/products/addItemBulk', {})
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
		nock(skuvault.apiUrl)
			.post('/products/removeItem', {})
			.reply(200, function() {
				return {
					contentType: this.req.headers['content-type'],
					RemoveItemStatus: 'Success'
				};
			});
		nock(skuvault.apiUrl)
			.post('/products/removeItemBulk', {})
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
