'use strict';
import {autobind} from 'core-decorators';
import request from 'request-promise';
import debug from 'debug';
import * as _ from 'lodash';
import ApiException from './ApiException';
import Bluebird from 'bluebird';

var {name, version} = require('../package.json'),
	debugReq = debug('sv:req'),
	toString = Object.prototype.toString,
	has = Object.prototype.hasOwnProperty,
	defaultOptions = Object.assign(Object.create(null), {
		apiUrl: 'https://app.skuvault.com/api',
		UserToken: null,
		TenantToken: null,
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

		return request(requestOptions)
						.then(result => {
							cb(result);
						})
						.catch(error => {
							if ( error === Object(error) && error::has('error') ) {
								cb(error);
							}
							cb({error});
						});
	}

  @autobind
	options(keyOrOptions) {
		// this method does not exist in the fb js sdk
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
	}

}

export default SkuVault;
