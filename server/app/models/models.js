var mongoose = require('mongoose');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/'+'backend', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

module.exports = mongoose;