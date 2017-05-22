'use strict';
import {autobind} from 'core-decorators';

class Auth {

	constructor(skuvault) {
		this.skuvault = skuvault;
	}

	/**
	 * login to get tokens
	 *
	 * @access public
	 * @param login {Object}     {Email:'', Password:''}
	 */
  @autobind
	login(...args) {
		return this.skuvault.api('/getTokens', 'post', ...args);
	}

}

export default Auth;
