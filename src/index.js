'use strict';
/**
 * Simultaneously satisfy require('skuvault') and Babel based ES2015 `import`
 * by exporting an object using Babel's __esModule which contains the normal
 * exports;
 */
var mod = require('./app'),
	{SV} = mod;

for ( let key of Object.getOwnPropertyNames(Object.getPrototypeOf(SV)) ) {
	if ( key === 'constructor' ) continue;
	if ( typeof SV[key] === 'function' ) {
		exports[key] = SV[key].bind(SV);
	} else {
		exports[key] = SV[key];
	}
}

for ( var key in mod ) {
	exports[key] = mod[key];
}

Object.defineProperty(exports, '__esModule', {value: true});
