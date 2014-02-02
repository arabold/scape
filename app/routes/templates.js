/**
 * Module dependencies.
 */
var _ = require('underscore'),
fs = require('fs');

//For details how auto-routing works, including the support for folders
//and middlewares, see https://npmjs.org/package/express-autoroute
module.exports.autoroute = {
	get : {
		'/templates/html' : getAllHtml,
		'/templates/html/*' : getHtml,
		'/templates/css' : getAllCss,
		'/templates/css/*' : getCss
	}
};

var walk = function(root, dir, filetype, done) {
	var results = [];
	var filetypeLen = filetype ? filetype.length : 0
	dir = dir ? (dir.charAt(0) === '/' ? dir : '/' + dir) : '';
	fs.readdir(root + dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			if (file.charAt(0) !== '.') {
				var filePath = root + dir + '/' + file;
				fs.stat(filePath, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(root + dir, file, filetype, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
					} else {
						if (filetypeLen <= 0 || file.substr(-filetypeLen) === filetype) {
							results.push(dir + '/' + file);
						}
						if (!--pending) done(null, results);
					}
				});
			}
		});
	});
};

function getAllHtml(req, res, next) {
	walk('./vendor/lib/ink/templates', null, '.html', function(err, results) {
		if (err) {
			next(err);
		} else {
			res.jsonp(results.sort());
		}
	});
};

function getAllCss(req, res, next) {
	walk('./vendor/lib/ink/css', null, '.css', function(err, results) {
		if (err) {
			next(err);
		} else {
			res.jsonp(results.sort());
		}
	});
};

function getHtml(req, res, next) {
	var path = './vendor/lib/ink/templates/' + req.params[0];
	res.sendfile(path);
}

function getCss(req, res, next) {
	var path = './vendor/lib/ink/css/' + req.params[0];
	res.sendfile(path);
}
