var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
	    name: "scape",
		url: "https://github.com/arabold/scape/",
		title: "Scape",
		description: "Responsive email editor based on ZURB's Ink boilerplate"
	},
	root: rootPath,
	port: process.env.PORT || 3000
}
