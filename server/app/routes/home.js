module.exports = function(app,arduino_server,sessions) {
	// application -------------------------------------------------------------
	
	// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    next();
	});

	app.get('/sessions', sessions.findAll);
	app.get('/sessions/:id', sessions.findById);

	app.post('/api/datoprueba', function(req, res) {
		//var arduinoArray = req.body.text.toString().split(',');

		//Actualiza Datos
	    app.io.broadcast('datoPrueba', {
			//val: req.body.val
			dato1: req.body.text.toString()
			/*dato2: arduinoArray[1],
			dato3: arduinoArray[2],
			dato4: arduinoArray[3]*/
		});
		// create a todo, information comes from AJAX request from Angular
		/*Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});*/

	});

	arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)
		console.log('esta vivo');
	    //console.log("server got: " + msg.readUInt16LE(0) + " from " + rinfo.address + ":" + rinfo.port);
	    //io.emit('arduino data', msg.readUInt16LE(0));
	    var arduinoArray = msg.toString().split(',');
	    //console.log(msg.toString());
	    //console.log(parseInt(arduinoArray[0]));
	    var sensorID = 'sensordata' + arduinoArray[0];
	    console.log(sensorID, parseInt(arduinoArray[1]));
	    //app.io.broadcast(sensorID, parseInt(arduinoArray[1]));

	    //debugger;

	    //Request RIOT

	    
	    //Actualiza Datos
	    app.io.broadcast('data_arduino', {
			//val: req.body.val
			dato1: arduinoArray[0],
			dato2: arduinoArray[1],
			dato3: arduinoArray[2],
			dato4: arduinoArray[3]
		});
	});


	//Mensaje Prueba
    /*app.io.broadcast('datoPrueba', {
		//val: req.body.val
		mensaje: "hola"
	});*/

};