var config = require('./config'),
	autoroute = require('express-autoroute'),
	path = require('path');

module.exports = function(app) {

	// Setup routes
	autoroute(app, {
		routesDir: path.join(__dirname, "../app/routes"),
		throwErrors: true
	});

};
