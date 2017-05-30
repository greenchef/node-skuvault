'use strict';
import nock from 'nock';
import {expect} from 'chai';
import {beforeEach, afterEach, before, describe, it} from 'mocha';
import {skuvault} from '../../config.json';
import {SkuVault} from '../app';

nock.disableNetConnect();

var sv = new SkuVault(skuvault);

beforeEach(() => {
	nock(skuvault.apiUrl)
		.post('/products/getProducts', {})
		.reply(200, function() {
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
					SupplierInfo: [
						{
							SupplierName: 'Unknown',
							SupplierPartNumber: '',
							Cost: 0,
							LeadTime: 0,
							IsActive: false,
							IsPrimary: true
						}
					],
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

afterEach(() => {
	nock.cleanAll();
});

describe('Products.find()', () => {
	it('should get products', (done) => {
		sv.products.find()
				.then(result => {
					expect(result).to.have.property('Products').that.is.a('array');
					done();
				});
	});
});

describe('Products.find({Sku: \'G-OMN-08-00034-Y\'})', () => {
	it('should find one product', (done) => {
		sv.products.find({Sku: 'G-OMN-08-00034-Y'})
				.then(result => {
					expect(result[0]).to.have.property('Sku', 'G-OMN-08-00034-Y');
					done();
				});
	});
});

describe('Products.find({Sku: \'Hotdog\'})', () => {
	it('should not find hotdog', (done) => {
		sv.products.find({Sku: 'Hotdog'})
				.then(result => {
					expect(result.length, 0);
					done();
				});
	});
});

describe('Products.create({Sku: \'G-OMN-08-00034-Y\'})', () => {
	before(() => {
		nock(skuvault.apiUrl)
			.post('/products/createProduct', {})
			.reply(400, () => {
				return {Status: 'BadRequest',
					Errors: [
						{
							Sku: 'Lincoln',
							ErrorMessages: ['Product already exists']
						}]
				};
			});
	});
	it('should fail to create a product that exists', (done) => {
		sv.products.create({Sku: 'G-OMN-08-00034-Y'})
				.catch(error => {
					expect(error.response).to.have.property('statusCode', 400);
					done();
				});
	});
});
