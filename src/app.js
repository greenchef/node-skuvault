'use strict';
import {autobind} from 'core-decorators';
import request from 'request-promise';
import debug from 'debug';
import appd from 'appdynamics';
import winston from 'winston';
import * as _ from 'lodash';
import ApiException from './ApiException';
import Bluebird from 'bluebird';
import {name, version} from '../package.json';

// Other Classes
import Auth from './auth/auth';
import Brands from './brands/brands';
import Products from './products/products';
import Suppliers from './suppliers/suppliers';
import Inventory from './inventory/inventory';

var debugReq = debug('sv:req'),
	toString = Object.prototype.toString,
	has = Object.prototype.hasOwnProperty,
	defaultOptions = Object.assign(Object.create(null), {
		apiUrl: 'https://staging.skuvault.com/api',
		UserToken: null,
		TenantToken: null,
		appdProfile: null,
		log: true,
		userAgent: `${name}/${version}`
	}),
	isValidOption = function(key) {
		return defaultOptions::has(key);
	};

const _opts = Symbol('opts');
const buildRequest = Symbol('buildRequest');
const authRequest = Symbol('authRequest');

class SkuVault {

	constructor(opts) {
		this[_opts] = Object.create(defaultOptions);
		if ( typeof opts === 'object' ) {
			_.merge(this[_opts], opts);
		}
		this.auth = new Auth(this);
		this.brands = new Brands(this);
		this.products = new Products(this);
		this.suppliers = new Suppliers(this);
		this.inventory = new Inventory(this);
		this.appd = (this.options('appdProfile') && Object.keys(this.options('appdProfile')).length && this.options('appdProfile').accountAccessKey)
			? appd.profile(this.options('appdProfile'))
			: null;
		this.logger = new (winston.Logger)({
								    transports: [
								      new (winston.transports.Console)({'timestamp':true})
								    ]
								  });
	}

/**
 *
 * @access public
 * @param path {String} the url path
 * @param method {String} the http method (default: `"GET"`)
 * @param params {Object} the parameters for the query
 * @return {Promise}
 */
  @autobind
	api(...args) {

		let ret = new Bluebird((resolve, reject) => {
			args.push((res) => {
				if ( !res || res.error ) {
					reject(new ApiException(res));
				} else {
					resolve(res);
				}
			});
		});

		this[buildRequest](...args);

		return ret;
	}

	[buildRequest](path, next, ...args) {
		var method, params, cb;
		while ( next ) {
			let type = typeof next;
			if ( type === 'string' && !method ) {
				method = next.toLowerCase();
			} else if ( type === 'function' && !cb ) {
				cb = next;
			} else if ( type === 'object' && !params ) {
				params = next;
			} else {
				return;
			}
			next = args.shift();
		}

		method = method || 'post';
		params = params || {};

		if ( typeof path !== 'string' ) {
			throw new Error(`Path is of type ${typeof path}, not string`);
		}

    // remove prefix slash if one is given, as it's already in the base url
		if ( path[0] === '/' ) {
			path = path.substr(1);
		}

		this[authRequest](path, method, params, cb);
	}

  /**
	 * Add the auth parameter, and fire of a request.
	 *
	 * @access private
	 * @param path {String}     the request path
	 * @param method {String}   the http method
	 * @param params {Object}   the parameters for the query
	 * @param cb {Function}     the callback function to handle the response
	 */
	[authRequest](path, method, params, cb) {
		var uri,
			body = {},
			requestOptions = {},
			json = true;

		params = params || {};
		cb = cb || function() {};

		uri = `${this.options('apiUrl')}/${path}`;

		if ( method === 'post' ) {
			if ( this.options('UserToken') )
				params.UserToken = this.options('UserToken');
			if ( this.options('TenantToken') )
				params.TenantToken = this.options('TenantToken');
			body = params;
		}

		requestOptions = {
			method,
			uri,
			body,
			json
		};

		requestOptions['headers'] = {
			'User-Agent': this.options('userAgent')
		};

		debugReq(' %s %j', uri, body);

		if(!!this.options('log'))
			this.logger.info(`SkuVault: ${JSON.stringify(requestOptions)}`);

		var req = request(requestOptions);

		var txn = (this.appd)
			? this.appd.startTransaction(req)
			: null;

		return req
						.then(result => {
							if (txn) {
								txn.end();
							}
							cb(result);
						})
						.catch(error => {
							if (txn) {
								txn.markError(error);
								txn.end();
							}
							if ( error === Object(error) && error::has('error') ) {
								cb(error);
							}
							cb({error});
						});
	}

  @autobind
	options(keyOrOptions) {
		var o = this[_opts];
		if ( !keyOrOptions ) {
			return o;
		}
		if ( keyOrOptions::toString() === '[object String]' ) {
			return isValidOption(keyOrOptions) && keyOrOptions in o ? o[keyOrOptions] : null;
		}
		for ( let key in o ) {
			if ( isValidOption(key) && key in o && keyOrOptions::has(key) ) {
				o[key] = keyOrOptions[key];
			}
		}
		this.appd = (this.options('appdProfile') && Object.keys(this.options('appdProfile')).length && this.options('appdProfile').accountAccessKey)
			? appd.profile(this.options('appdProfile'))
			: null;
	}

	@autobind
	auth() {
		return this.auth;
	}

	@autobind
	brands() {
		return this.brands;
	}

	@autobind
	products() {
		return this.products;
	}

	@autobind
	suppliers() {
		return this.suppliers;
	}

}

export var SV = new SkuVault();
export default SkuVault;
export {SkuVault, ApiException, version};
