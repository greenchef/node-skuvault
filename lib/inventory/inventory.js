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

var Inventory = (_class = function () {
	function Inventory(skuvault) {
		(0, _classCallCheck3.default)(this, Inventory);

		this.skuvault = skuvault;
	}

	/**
  * add inventory
  *
  * @access public
  * @param item {Object|Array} Add item or items
  */


	(0, _createClass3.default)(Inventory, [{
		key: 'add',
		value: function add() {
			var _skuvault;

			var endpoint = '/products/addItem';

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (args[0].length) {
				endpoint = '/products/addItemBulk';
				args[0] = { Items: args[0] };
			}
			return (_skuvault = this.skuvault).api.apply(_skuvault, [endpoint, 'post'].concat(args));
		}

		/**
   * remove inventory
   *
   * @access public
   * @param item {Object|Array} Remove item or items
   */

	}, {
		key: 'remove',
		value: function remove() {
			var _skuvault2;

			var endpoint = '/products/removeItem';

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			if (args[0].length) {
				endpoint = '/products/removeItemBulk';
				args[0] = { Items: args[0] };
			}
			return (_skuvault2 = this.skuvault).api.apply(_skuvault2, [endpoint, 'post'].concat(args));
		}
	}]);
	return Inventory;
}(), (_applyDecoratedDescriptor(_class.prototype, 'add', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'add'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'remove'), _class.prototype)), _class);
exports.default = Inventory;