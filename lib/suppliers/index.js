'use strict';

var suppliers = require('./suppliers');

module.exports = {
	find: suppliers.find,
	create: suppliers.create
};