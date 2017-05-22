'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = ApiException;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApiException(res) {
	this.name = 'ApiException';
	this.message = (0, _stringify2.default)(res || {});
	this.response = res;
	Error.captureStackTrace(this, this.constructor.name);
}

ApiException.prototype = (0, _create2.default)(Error.prototype, {
	constructor: {
		value: ApiException,
		enumerable: false,
		writable: true,
		configurable: true
	}
});