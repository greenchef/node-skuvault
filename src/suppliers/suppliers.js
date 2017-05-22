'use strict';
import {autobind} from 'core-decorators';
import * as _ from 'lodash';

const parseResponse = Symbol('parseResponse');

class Suppliers {

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
			filter = args[0];
			args.splice(0, 1);
		}
		return this.skuvault.api('/products/getSuppliers', 'post', ...args).then(response => {
			return this[parseResponse](filter, response);
		});
	}

	/**
	 * Create supplier
	 *
	 * @access public
	 * @param supplier {Object}     the supplier to create
	 */
  @autobind
	create(...args) {
		if (args[0].length) {
			args[0] = {Suppliers: args[0]};
		} else {
			args[0] = {Suppliers: [args[0]]};
		}
		return this.skuvault.api('/products/createSuppliers', 'post', ...args);
	}

	/**
	 * Parse the response
	 *
	 * @access private
	 * @param filter {String}     the fields to filter on
	 * @param response {String}   the response to filter
	 */
	[parseResponse](filter, response) {
		if (!filter)
			return response;

		if (response.Suppliers && response.Suppliers.length) {
			return _.filter(response.Suppliers, filter);
		}

		return response;
	}

}

export default Suppliers;
