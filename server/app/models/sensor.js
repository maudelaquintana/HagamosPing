var mongoose = require('mongoose');

module.exports = mongoose.model('Sensor', {
	sw1: { type: String },
	sw2: { type: String },
	sw3: { type: String},
	sw4: { type: String },
	sw5: { type: String}

});