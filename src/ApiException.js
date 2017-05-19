'use strict';

export default function ApiException(res) {
	this.name = 'ApiException';
	this.message = JSON.stringify(res || {});
	this.response = res;
	Error.captureStackTrace(this, this.constructor.name);
}

ApiException.prototype = Object.create(Error.prototype, {
	constructor: {
		value: ApiException,
		enumerable: false,
		writable: true,
		configurable: true
	}
});
