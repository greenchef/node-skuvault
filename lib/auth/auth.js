'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

var _coreDecorators = require('core-decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var Auth = (_class = function () {
	function Auth(skuvault) {
		(0, _classCallCheck3.default)(this, Auth);

		this.skuvault = skuvault;
	}

	/**
  * login to get tokens
  *
  * @access public
  * @param login {Object}     {Email:'', Password:''}
  */


	(0, _createClass3.default)(Auth, [{
		key: 'login',
		value: function login() {
			var _skuvault;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return (_skuvault = this.skuvault).api.apply(_skuvault, ['/getTokens', 'post'].concat(args));
		}
	}]);
	return Auth;
}(), (_applyDecoratedDescriptor(_class.prototype, 'login', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'login'), _class.prototype)), _class);
exports.default = Auth;