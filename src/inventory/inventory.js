'use strict';
import {autobind} from 'core-decorators';

class Inventory {

	constructor(skuvault) {
		this.skuvault = skuvault;
	}

	/**
	 * add inventory
	 *
	 * @access public
	 * @param item {Object|Array} Add item or items
	 */
  @autobind
	add(...args) {
		let endpoint = '/products/addItem';
		if (args[0].length) {
			endpoint = '/products/addItemBulk';
			args[0] = {Items: args[0]};
		}
		return this.skuvault.api(endpoint, 'post', ...args);
	}

	/**
	 * remove inventory
	 *
	 * @access public
	 * @param item {Object|Array} Remove item or items
	 */
	@autobind
	remove(...args) {
		let endpoint = '/products/removeItem';
		if (args[0].length) {
			endpoint = '/products/removeItemBulk';
			args[0] = {Items: args[0]};
		}
		return this.skuvault.api(endpoint, 'post', ...args);
	}

}

export default Inventory;
