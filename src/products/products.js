'use strict';
import {autobind} from 'core-decorators';
import * as _ from 'lodash';
import SkuVault from '../app';

const parseResponse = Symbol('parseResponse');

class Products extends SkuVault {

	constructor(opts) {
		super(opts);
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
			filter = args[0];
			args.splice(0, 1);
		}
		return this.api('/products/getProducts', 'post', ...args).then(response => {
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
		return this.api(endpoint, 'post', ...args);
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
		return this.api(endpoint, 'post', ...args);
	}

	/**
	 * Add the auth parameter, and fire of a request.
	 *
	 * @access private
	 * @param filter {String}     the fields to filter on
	 * @param response {String}   the response to filter
	 */
	[parseResponse](filter, response) {
		if (!filter)
			return response;

		if (response.Products && response.Products.length) {
			return _.filter(response.Products, filter);
		}

		return response;
	}

}

export default Products;
