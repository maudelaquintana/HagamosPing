var models = require('mongoose'),
	Schema = models.Schema;

var sensorSchema = new Schema({
	sw1: 	{ type: String },
	sw2: 	{ type: String },
	sw3: 	{ type: String },
	sw4:	{ type: String },
	sw5:	{ type: String }
});

module.exports = models.model('Sensor', sensorSchema);