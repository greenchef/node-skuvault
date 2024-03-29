'use strict';
import nock from 'nock';
import {expect} from 'chai';
import {beforeEach, afterEach, before, describe, it} from 'mocha';
import {SkuVault} from '../app';
import config from '../../config.json';

nock.disableNetConnect();

var sv = new SkuVault(config);

beforeEach(() => {
	nock(config.apiUrl)
		.post('/products/getBrands', {})
		.reply(200, function() {
			return {
				contentType: this.req.headers['content-type'],
				Brands: [{
					Name: 'Generic',
					IsEnabled: true
				},
				{
					Name: 'Lincoln',
					IsEnabled: true
				},
				{
					Name: 'Tides',
					IsEnabled: true
				}]
			};
		});
});

afterEach(() => {
	nock.cleanAll();
});

describe('Brands.find()', () => {
	it('should get brands', (done) => {
		sv.brands.find()
				.then(result => {
					expect(result).to.have.property('Brands').that.is.a('array');
					done();
				});
	});
});

describe('Brands.find({Name: \'Generic\'})', () => {
	it('should get one brand', (done) => {
		sv.brands.find({Name: 'Generic'})
				.then(result => {
					expect(result[0]).to.have.property('Name', 'Generic');
					done();
				});
	});
});

describe('Brands.find({Name: \'NotGeneric\'})', () => {
	it('should not find brand', (done) => {
		sv.brands.find({Name: 'NotGeneric'})
				.then(result => {
					expect(result.length, 0);
					done();
				});
	});
});

describe('Brands.create({Name: \'Lincoln\'})', () => {
	before(() => {
		nock(config.apiUrl)
			.post('/products/createBrands', {})
			.reply(400, () => {
				return {Status: 'BadRequest',
					Errors: [{
						BrandName: 'Lincoln',
						ErrorMessages: ['Brand name already exists']
					}]
				};
			});
	});
	it('should fail to create a brand that exists', (done) => {
		sv.brands.create({Brands: [{Name: 'Lincoln'}]})
				.catch(error => {
					expect(error.response).to.have.property('statusCode', 400);
					done();
				});
	});
});
