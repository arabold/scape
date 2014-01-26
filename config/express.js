/**
 * Module dependencies.
 */
var express = require('express'),
config = require('./config');

var ConnectMincer = require('connect-mincer');
var connectMincer = new ConnectMincer({
	root: config.root,
	production: process.env.NODE_ENV === 'production',
	mountPoint: '/',
	manifestFile: config.root + '/assets/manifest.json',
	paths: [
	        'assets/',
	        'vendor/'
	        ]
});

module.exports = function(app) {
	app.set('showStackError', true);    

	//Prettify HTML
	app.locals.pretty = true;

	//Don't use logger for test env
	if (process.env.NODE_ENV !== 'test') {
		app.use(express.logger('dev'));
	}

	//Set views path, template engine and default layout
	app.set('views', config.root + '/app/views');
	app.set('view engine', 'ejs');

	//Enable jsonp
	app.enable("jsonp callback");

	app.configure(function() {
		//cookieParser should be above session
		app.use(express.cookieParser());

		// request body parsing middleware should be above methodOverride
		app.use(express.urlencoded());
		app.use(express.json());
		app.use(express.methodOverride());

		//Should be placed before express.static
		app.use(express.compress({
			filter: function(req, res) {
				return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
			},
			level: 9
		}));

		//Setting the fav icon and static folder
		app.use(express.favicon());
//		app.use(express.static(config.root + '/public'));

		// Routes
		app.use(app.router);

		// Mincer is last and also handles 404 errors for us
		// access the internal Mincer object if you want to do anything extra to it, e.g.
		app.use(connectMincer.assets());
		// TODO In production it would be better to serve from a static source or CDN
		var mincerServer = connectMincer.createServer();
		app.use('/', mincerServer);
	});
};
