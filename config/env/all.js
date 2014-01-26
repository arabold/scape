var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		name: "lean",
		url: "https://github.com/arabold/lean-boilerplate",
		title: "lean boilerplate",
		description: "lean - lean express angularjs node.js boilerplate"
	},
	root: rootPath,
	port: process.env.PORT || 3000
}
