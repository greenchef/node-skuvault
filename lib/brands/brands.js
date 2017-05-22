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

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class;

var _coreDecorators = require('core-decorators');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var parseResponse = (0, _symbol2.default)('parseResponse');

var Brands = (_class = function () {
	function Brands(skuvault) {
		(0, _classCallCheck3.default)(this, Brands);

		this.skuvault = skuvault;
	}

	/**
  * find brands
  *
  * @access public
  * @param brand {Object}     the brand to find
  */


	(0, _createClass3.default)(Brands, [{
		key: 'find',
		value: function find() {
			var _skuvault,
			    _this = this;

			var filter;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (args.length && typeof args[0] === 'object') {
				filter = args[0];
				args.splice(0, 1);
			}
			return (_skuvault = this.skuvault).api.apply(_skuvault, ['/products/getBrands', 'post'].concat(args)).then(function (response) {
				return _this[parseResponse](filter, response);
			});
		}

		/**
   * Create brands
   *
   * @access public
   * @param brand {Object}     the brand to create
   */

	}, {
		key: 'create',
		value: function create() {
			var _skuvault2;

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			if (args[0].length) {
				args[0] = { Brands: args[0] };
			} else {
				args[0] = { Brands: [args[0]] };
			}
			return (_skuvault2 = this.skuvault).api.apply(_skuvault2, ['/products/createBrands', 'post'].concat(args));
		}

		/**
   * Parse the response
   *
   * @access private
   * @param filter {String}     the fields to filter on
   * @param response {String}   the response to filter
   */

	}, {
		key: parseResponse,
		value: function value(filter, response) {
			if (!filter) return response;

			if (response.Brands && response.Brands.length) {
				return _.filter(response.Brands, filter);
			}

			return response;
		}
	}]);
	return Brands;
}(), (_applyDecoratedDescriptor(_class.prototype, 'find', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'find'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'create', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'create'), _class.prototype)), _class);
exports.default = Brands;