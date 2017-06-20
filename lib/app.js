'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.version = exports.ApiException = exports.SkuVault = exports.SV = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _desc, _value, _class;

// Other Classes


var _coreDecorators = require('core-decorators');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _appdynamics = require('appdynamics');

var _appdynamics2 = _interopRequireDefault(_appdynamics);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _ApiException = require('./ApiException');

var _ApiException2 = _interopRequireDefault(_ApiException);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _package = require('../package.json');

var _auth = require('./auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _brands = require('./brands/brands');

var _brands2 = _interopRequireDefault(_brands);

var _products = require('./products/products');

var _products2 = _interopRequireDefault(_products);

var _suppliers = require('./suppliers/suppliers');

var _suppliers2 = _interopRequireDefault(_suppliers);

var _inventory = require('./inventory/inventory');

var _inventory2 = _interopRequireDefault(_inventory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var debugReq = (0, _debug2.default)('sv:req'),
    toString = Object.prototype.toString,
    has = Object.prototype.hasOwnProperty,
    defaultOptions = (0, _assign2.default)((0, _create2.default)(null), {
	apiUrl: 'https://staging.skuvault.com/api',
	UserToken: null,
	TenantToken: null,
	appdProfile: null,
	log: true,
	userAgent: `${_package.name}/${_package.version}`
}),
    isValidOption = function isValidOption(key) {
	return has.call(defaultOptions, key);
};

var _opts = (0, _symbol2.default)('opts');
var buildRequest = (0, _symbol2.default)('buildRequest');
var authRequest = (0, _symbol2.default)('authRequest');

var SkuVault = (_class = function () {
	function SkuVault(opts) {
		(0, _classCallCheck3.default)(this, SkuVault);

		this[_opts] = (0, _create2.default)(defaultOptions);
		if (typeof opts === 'object') {
			_.merge(this[_opts], opts);
		}
		this.auth = new _auth2.default(this);
		this.brands = new _brands2.default(this);
		this.products = new _products2.default(this);
		this.suppliers = new _suppliers2.default(this);
		this.inventory = new _inventory2.default(this);
		this.appd = this.options('appdProfile') && (0, _keys2.default)(this.options('appdProfile')).length && this.options('appdProfile').accountAccessKey ? _appdynamics2.default.profile(this.options('appdProfile')) : null;
		this.logger = new _winston2.default.Logger({
			transports: [new _winston2.default.transports.Console({ 'timestamp': true })]
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


	(0, _createClass3.default)(SkuVault, [{
		key: 'api',
		value: function api() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var ret = new _bluebird2.default(function (resolve, reject) {
				args.push(function (res) {
					if (!res || res.error) {
						reject(new _ApiException2.default(res));
					} else {
						resolve(res);
					}
				});
			});

			this[buildRequest].apply(this, args);

			return ret;
		}
	}, {
		key: buildRequest,
		value: function value(path, next) {
			var method, params, cb;

			for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
				args[_key2 - 2] = arguments[_key2];
			}

			while (next) {
				var type = typeof next;
				if (type === 'string' && !method) {
					method = next.toLowerCase();
				} else if (type === 'function' && !cb) {
					cb = next;
				} else if (type === 'object' && !params) {
					params = next;
				} else {
					return;
				}
				next = args.shift();
			}

			method = method || 'post';
			params = params || {};

			if (typeof path !== 'string') {
				throw new Error(`Path is of type ${typeof path}, not string`);
			}

			// remove prefix slash if one is given, as it's already in the base url
			if (path[0] === '/') {
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

	}, {
		key: authRequest,
		value: function value(path, method, params, cb) {
			var uri,
			    body = {},
			    requestOptions = {},
			    json = true;

			params = params || {};
			cb = cb || function () {};

			uri = `${this.options('apiUrl')}/${path}`;

			if (method === 'post') {
				if (this.options('UserToken')) params.UserToken = this.options('UserToken');
				if (this.options('TenantToken')) params.TenantToken = this.options('TenantToken');
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

			if (!!this.options('log')) this.logger.info(`SkuVault: ${(0, _stringify2.default)(requestOptions)}`);

			var req = (0, _requestPromise2.default)(requestOptions);

			var txn = this.appd ? this.appd.startTransaction(req) : null;

			return req.then(function (result) {
				if (txn) {
					txn.end();
				}
				cb(result);
			}).catch(function (error) {
				if (txn) {
					txn.markError(error);
					txn.end();
				}
				if (error === Object(error) && has.call(error, 'error')) {
					cb(error);
				}
				cb({ error });
			});
		}
	}, {
		key: 'options',
		value: function options(keyOrOptions) {
			var o = this[_opts];
			if (!keyOrOptions) {
				return o;
			}
			if (toString.call(keyOrOptions) === '[object String]') {
				return isValidOption(keyOrOptions) && keyOrOptions in o ? o[keyOrOptions] : null;
			}
			for (var key in o) {
				if (isValidOption(key) && key in o && has.call(keyOrOptions, key)) {
					o[key] = keyOrOptions[key];
				}
			}
			this.appd = this.options('appdProfile') && (0, _keys2.default)(this.options('appdProfile')).length && this.options('appdProfile').accountAccessKey ? _appdynamics2.default.profile(this.options('appdProfile')) : null;
		}
	}, {
		key: 'auth',
		value: function auth() {
			return this.auth;
		}
	}, {
		key: 'brands',
		value: function brands() {
			return this.brands;
		}
	}, {
		key: 'products',
		value: function products() {
			return this.products;
		}
	}, {
		key: 'suppliers',
		value: function suppliers() {
			return this.suppliers;
		}
	}]);
	return SkuVault;
}(), (_applyDecoratedDescriptor(_class.prototype, 'api', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'api'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'options', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'options'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'auth', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'auth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'brands', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'brands'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'products', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'products'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'suppliers', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'suppliers'), _class.prototype)), _class);
var SV = exports.SV = new SkuVault();
exports.default = SkuVault;
exports.SkuVault = SkuVault;
exports.ApiException = _ApiException2.default;
exports.version = _package.version;