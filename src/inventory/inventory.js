'use strict';
import {autobind} from 'core-decorators';

class Inventory {

	constructor(skuvault) {
		this.skuvault = skuvault;
	}

	/**
	 * find inventory
	 *
	 * @access public
	 * @param item {Object} Find items
	 */
  @autobind
	find(...args) {
		return this.skuvault.api('/inventory/getItemQuantities', 'post', ...args);
	}

	/**
	 * add inventory
	 *
	 * @access public
	 * @param item {Object|Array} Add item or items
	 */
  @autobind
	add(...args) {
		let endpoint = '/inventory/addItem';
		if (args[0].length) {
			endpoint = '/inventory/addItemBulk';
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
		let endpoint = '/inventory/removeItem';
		if (args[0].length) {
			endpoint = '/inventory/removeItemBulk';
			args[0] = {Items: args[0]};
		}
		return this.skuvault.api(endpoint, 'post', ...args);
	}

}

export default Inventory;
