'use strict';
import nock from 'nock';
import {expect} from 'chai';
import {beforeEach, afterEach, describe, it} from 'mocha';
import {skuvault} from '../../config.json';
import {SkuVault} from '../app';

nock.disableNetConnect();

var sv = new SkuVault(skuvault);

beforeEach(() => {
	nock(skuvault.apiUrl)
		.post('/getTokens', {})
		.reply(200, function() {
			return {
				contentType: this.req.headers['content-type'],
				TenantToken: 'String',
				UserToken: 'String'
			};
		});
});

afterEach(() => {
	nock.cleanAll();
});

describe('Auth.login()', () => {
	it('should login', (done) => {
		sv.auth.login()
				.then(result => {
					expect(result).to.have.property('TenantToken');
					expect(result).to.have.property('UserToken');
					done();
				});
	});
});
