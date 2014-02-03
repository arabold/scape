/**
 * Module dependencies.
 */
var _ = require('underscore');

// For details how auto-routing works, including the support for folders
// and middlewares, see https://npmjs.org/package/express-autoroute
module.exports.autoroute = {
	get : {
		'/sample/method1' : method1,
		'/sample/method2' : method2,
		'/sample/method3' : method3
	}
};

function method1(req, res, next) {
	res.jsonp({
		'result': '1'
	});
};

function method2(req, res, next) {
	res.jsonp({
		'result': '2'
	});
};

function method3(req, res, next) {
	res.jsonp({
		'result': '3'
	});
};
