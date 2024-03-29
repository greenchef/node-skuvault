'use strict';
import {autobind} from 'core-decorators';
import * as _ from 'lodash';

const parseResponse = Symbol('parseResponse');

class Brands {

	constructor(skuvault) {
		this.skuvault = skuvault;
	}

	/**
	 * find brands
	 *
	 * @access public
	 * @param brand {Object}     the brand to find
	 */
  @autobind
	find(...args) {
		var filter;
		if (args.length && typeof args[0] === 'object') {
			filter = args[0];
			args.splice(0, 1);
		}
		return this.skuvault.api('/products/getBrands', 'post', ...args).then(response => {
			return this[parseResponse](filter, response);
		});
	}

	/**
	 * Create brands
	 *
	 * @access public
	 * @param brand {Object}     the brand to create
	 */
  @autobind
	create(...args) {
		if (args[0].length) {
			args[0] = {Brands: args[0]};
		} else {
			args[0] = {Brands: [args[0]]};
		}
		return this.skuvault.api('/products/createBrands', 'post', ...args);
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

		if (response.Brands && response.Brands.length) {
			return _.filter(response.Brands, filter);
		}

		return response;
	}

}

export default Brands;
