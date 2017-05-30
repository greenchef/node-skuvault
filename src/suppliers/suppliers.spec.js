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
		.post('/products/getSuppliers', {})
		.reply(200, function() {
			return {
				contentType: this.req.headers['content-type'],
				Suppliers: [
					{
						Name: 'Unknown',
						IsEnabled: true
					},
					{
						Name: "Albert's Organics (CO)",
						IsEnabled: true
					},
					{
						Name: 'Saputo Specialty Cheese',
						IsEnabled: true
					},
					{
						Name: 'Boulder Cheese',
						IsEnabled: true
					},
					{
						Name: "Jimmy's Taco Wagon",
						IsEnabled: true
					},
					{
						Name: "Bob's Red Mill",
						IsEnabled: true
					}]
			};
		});
});

afterEach(() => {
	nock.cleanAll();
});

describe('Suppliers.find()', () => {
	it('should get suppliers', (done) => {
		sv.suppliers.find()
				.then(result => {
					expect(result).to.have.property('Suppliers').that.is.a('array');
					done();
				});
	});
});

describe('Suppliers.find({Name: \'Boulder Cheese\'})', () => {
	it('should find one supplier', (done) => {
		sv.suppliers.find({Name: 'Boulder Cheese'})
				.then(result => {
					expect(result[0]).to.have.property('Name', 'Boulder Cheese');
					done();
				});
	});
});

describe('Suppliers.find({Name: \'Not Supplier\'})', () => {
	it('should not find hotdog', (done) => {
		sv.suppliers.find({Name: 'Not Supplier'})
				.then(result => {
					expect(result.length, 0);
					done();
				});
	});
});

describe('Suppliers.create({Name: \'Boulder Cheese\'})', () => {
	before(() => {
		nock(skuvault.apiUrl)
			.post('/products/createSuppliers', {})
			.reply(400, () => {
				return {Status: 'BadRequest',
					Errors: [
						{
							Name: 'Boulder Cheese',
							ErrorMessages: ['Supplier already exists']
						}]
				};
			});
	});
	it('should fail to create a supplier that exists', (done) => {
		sv.suppliers.create({Name: 'Boulder Cheese'})
				.catch(error => {
					expect(error.response).to.have.property('statusCode', 400);
					done();
				});
	});
});
