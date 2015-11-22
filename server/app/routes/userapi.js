//File: routes/userapi.js
module.exports = function(app) {

  var User = require('../models/user.js');

  //GET - Return all users in the DB
  findAllUsers = function(req, res) {
    User.find(function(err, users) {
      if(!err) {
        console.log('GET /users')
        res.send(users);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified ID
  findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(!err) {
        console.log('GET /user/' + req.params.id);
        res.send(user);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Login
  loginUser = function(req, res) {
    console.log('POST - LOGIN');
    console.log(req.body);
    User.find({ nick: req.body.nick, pass: req.body.pass }, function(err, user) {
      console.log(user)
      if (err) {
        console.log('ERROR: ' + err);
        res.send("{response: 'no_login'}");
      } else {
        if (user[0]) {
          console.log('SUCCESS');
          res.send("{response: 'login'}");
        }
        else{
          console.log('ERROR: ' + err);
          res.send("{response: 'no_login'}");
        }
      }
    });
  };

  //POST - Insert a new User in the DB
  addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new User({
        idUsuario:req.body.idUsuario,
        nombre:   req.body.nombre,
        email:    req.body.email,
        imagen:   req.body.imagen,
        nick:     req.body.nick,
        pass:     req.body.pass
    });

    user.save(function(err) {
      if(!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(user);
  };

  //PUT - Update a register already exists
  updateUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
      user.idUsuario = req.body.idUsuario;
      user.nombre = req.body.nombre;
      user.email = req.body.email;
      user.imagen = req.body.imagen;
      user.nick = req.body.nick;
      user.pass = req.body.pass;
      
      user.save(function(err) {
        if(!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
        }
        res.send(user);
      });
    });
  }

  //DELETE - Delete a User with specified ID
  deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
      user.remove(function(err) {
        if(!err) {
          console.log('Removed');
        } else {
          console.log('ERROR: ' + err);
        }
      })
    });
  }

  //Link routes and functions
  app.get('/users', findAllUsers);
  app.get('/user/:id', findById);
  app.post('/user', addUser);
  app.put('/user/:id', updateUser);
  app.delete('/user/:id', deleteUser);
  //Login
  app.post('/login',loginUser);

}