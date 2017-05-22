'use strict';
/**
 * Simultaneously satisfy require('skuvault') and Babel based ES2015 `import`
 * by exporting an object using Babel's __esModule which contains the normal
 * exports;
 */
var mod = require('./app'),
	{SkuVault} = mod;

for ( let key of Object.getOwnPropertyNames(Object.getPrototypeOf(SkuVault)) ) {
	if ( key === 'constructor' ) continue;
	if ( typeof SkuVault[key] === 'function' ) {
		exports[key] = SkuVault[key].bind(SkuVault);
	} else {
		exports[key] = SkuVault[key];
	}
}

for ( var key in mod ) {
	exports[key] = mod[key];
}

Object.defineProperty(exports, '__esModule', {value: true});
