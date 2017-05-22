'use strict';

var products = require('./products');

module.exports = {
	find: products.find,
	create: products.create,
	update: products.update
};