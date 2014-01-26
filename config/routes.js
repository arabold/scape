config = require('./config');

module.exports = function(app) {

	// Home route
	app.get('/', function(req, res) {
		res.render('index', {
			app : config.app
		});
	});

};
