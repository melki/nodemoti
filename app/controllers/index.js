/*
 * GET home page.
 */

var db        = require('../models/db');
var mongoose  = require('mongoose');
var motiModel =  mongoose.model('moti');
var url       = require("url");
var fs        = require('fs');

var month;
var day;
var hour;
var min;
var date
var moti;

exports.index = function(req, res){
	res.render('index', { title: 'home' });
};

exports.data = function(req, res){
	res.render('data', { title: 'data' });
};

exports.graphs = function(req, res){
	res.render('graphs', { title: 'graphs' });
};

exports.particles = function(req, res){
	res.render('particles', { title: 'particles' });
};

exports.d3js = function(req, res){
	res.render('d3js', { title: 'd3js' });
};

exports.list = function (req, res ){
	motiModel.find().distinct('session', function ( err, result ){
		moti = result.sort(function(a,b){
			return a - b;
		});
	});

	res.render( 'list', {
		title : 'list',
		list : 1,
		b : -1,
		moti : moti
	});
};

exports.session = function (req, res){
	var  test = url.parse(req.url).pathname.split('/');

	test = test[test.length-1];

	console.log(test);

	motiModel.find({ session : test }).exec( function ( err, moti, count ){
		if( err ) {
			throw(err);
		};

		motiti = moti;

		fs.writeFile('./public/tmp/data.json', JSON.stringify(moti), function (err){
			if (err){
				throw err;
			}
			console.log('The json is saved!');
		});

		date = new Date(motiti[0].date);

		month = date.getMonth();
		day   = date.getDate();
		hour  = date.getHours();
		min   = date.getMinutes();

		res.render( 'list', {
			title : 'list',
			list :0,
			session : test,
			date :  hour + ":" + min + " the " + day + "/" + month
		});
	});
};