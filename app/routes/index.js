/**
 * Module dependencies.
 */
var config = require('../../config/config'),
_ = require('underscore');

module.exports.autoroute = {
	get : {
		'/' : render
	}
};

function render(req, res) {
	res.render('index', {
		app : config.app
	});
};

