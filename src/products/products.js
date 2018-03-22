'use strict';
import {autobind} from 'core-decorators';
import * as _ from 'lodash';

const parseResponse = Symbol('parseResponse');

class Products {

	constructor(skuvault) {
		this.skuvault = skuvault;
	}

	/**
	 * find products
	 *
	 * @access public
	 * @param product {Object}     the product to find
	 */
  @autobind
	find(...args) {
		var filter;
		if (args.length && typeof args[0] === 'object') {
			filter = args[0].ProductSKUs;
		}
		return this.skuvault.api('/products/getProducts', 'post', ...args).then(response => {
			return this[parseResponse](filter, response);
		});
	}

	/**
	 * Create products
	 *
	 * @access public
	 * @param product {Object|Array}     the product or products to create
	 */
  @autobind
	create(...args) {
		let endpoint = '/products/createProduct';
		if (args[0].length) {
			endpoint = '/products/createProducts';
			args[0] = {Items: args[0]};
		}
		console.log('create ARGS!', ...args);
		return this.skuvault.api(endpoint, 'post', ...args);
	}

	/**
	 * Update products
	 *
	 * @access public
	 * @param product {Object|Array}     the product or products to update
	 */
	@autobind
	update(...args) {
		let endpoint = '/products/updateProduct';
		if (args[0].length) {
			endpoint = '/products/updateProducts';
			args[0] = {Items: args[0]};
		}
		console.log('update ARGS!', ...args);
		return this.skuvault.api(endpoint, 'post', ...args);
	}

	/**
	 * Parse the response
	 *
	 * @access private
	 * @param filter {String}     the fields to filter on
	 * @param response {String}   the response to filter
	 */
	[parseResponse](filter, response) {
		if (!filter) return response;

		return _.chain(response.Products)
			.map('Sku')
			.filter(gcSku => _.filter(filter, gcSku))
			.value();
	}

}

export default Products;
