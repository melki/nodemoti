var mongoose = require( 'mongoose' );

var moti = new mongoose.Schema({
	date : { type : Date, default : Date.now },
	session: {type : Number,  required: true },
	x: Number,
	y: Number,
	z: Number,
	yaw: Number,
	pitch: Number,
	roll: Number,
});

mongoose.model('moti', moti );

var nbSessions = new mongoose.Schema({
	date : { type : Date, default : Date.now },
});

mongoose.model('nbSessions', nbSessions);

var set = new mongoose.Schema({
	date : { type : Date, default : Date.now },
});

mongoose.model('set', set);

var setData = new mongoose.Schema({
	action : { type : String,  required: true },
	x: Number,
	y: Number,
	z: Number,
	yaw: Number,
	pitch: Number,
	roll: Number,
	idSet : { type : Number,  required: true }
});

mongoose.model('setData', setData);

mongoose.connect('mongodb://localhost/test6');
