//File: routes/sensors.js
module.exports = function(app) {

  var Sensor = require('../models/sensor.js');

  //GET - Return all sensors in the DB
  findAllSensors = function(req, res) {
  	Sensor.find(function(err, sensors) {
  		if(!err) {
        console.log('GET /sensors')
  			res.send(sensors);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  findById = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		if(!err) {
        console.log('GET /sensor/' + req.params.id);
  			res.send(sensor);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Sensor in the DB
  addSensor = function(req, res) {
  	console.log('POST');
  	console.log(req.body);

  	var sensor = new Sensor({
  		sw1: req.body.sw1,
      sw2: req.body.sw2,
      sw3: req.body.sw3,
  		sw4: req.body.sw4,
      sw5: req.body.sw5
  	});

  	sensor.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(sensor);
  };

  //PUT - Update a register already exists
  updateSensor = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		sensor.sw1 = req.body.sw1;
      sensor.sw2 = req.body.sw2;
      sensor.sw3 = req.body.sw3;
      sensor.sw4 = req.body.sw4;
      sensor.sw5 = req.body.sw5;

  		sensor.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(sensor);
  		});
  	});
  }

  //DELETE - Delete a Sensor with specified ID
  deleteSensor = function(req, res) {
  	Sensor.findById(req.params.id, function(err, sensor) {
  		sensor.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/sensors', findAllSensors);
  app.get('/sensor/:id', findById);
  app.post('/sensor', addSensor);
  app.put('/sensor/:id', updateSensor);
  app.delete('/sensor/:id', deleteSensor);

}