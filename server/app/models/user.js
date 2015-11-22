var models = require('mongoose'),
	Schema = models.Schema;

var userSchema = new Schema({
	idUsuario: 	{ type: Number}, 
	nombre: 	{ type: String },
	email: 		{ type: String },
	imagen: 	{ type: String },
	nick:		{ type: String },
	pass: 		{ type: String }
});

module.exports = models.model('User', userSchema);
