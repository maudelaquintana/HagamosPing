// set up ======================================================================
var express  = require('express.io');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.port || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var dgram = require('dgram');
var arduino_server = dgram.createSocket("udp4");
app.http().io();

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================
var sensorController = require('./app/routes/sensorapi');
sensorController(app);
require('./app/routes/home.js')(app,arduino_server);
var userController = require('./app/routes/userapi')
userController(app)


//Socket_Arduino
arduino_server.on("listening", function() {
    var address = arduino_server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

arduino_server.bind(6000); //listen to udp traffic on port 6000

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);