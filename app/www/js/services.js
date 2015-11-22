angular.module("starter")
.factory("PostResource", function($resource){
	return $resource("http://jsonplaceholder.typicode.com/posts/:id",{id:"@id"},{update: {method: "PUT"}});
})

/*.factory("UmaEye", function($resource){
  return $resource("http://192.168.1.21:3000/sensors/:id",{id:"@id"},{update: {method: "PUT"}});
})*/

.factory('socket',function(socketFactory){
    //Create socket and connect to http://chat.socket.io 
    var myIoSocket = io.connect('http://chat.socket.io');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})

.factory('Sensors', ['$http',function($http) {
  
  return {
    get : function() {
      return $http.get('/sensors');
    },
    getId : function(id) {
      return $http.get('/sensor/'+id);
    },
    update : function(id) {
      return $http.put('/sensor/'+id);
    },
    create : function(sensor) {
      return $http.post('/sensor', sensor);
    },
    delete : function(id) {
      return $http.delete('/sensor/' + id);
    }
  }
}])

.factory('DataPrueba', ['$http',function($http) {
	
	return {
		/*get : function() {
			return $http.get('/api/todos');
		},*/
		create : function(todoData) {
			return $http.post('/api/datoprueba', todoData);
		}/*,
		delete : function(id) {
			return $http.delete('/api/todos/' + id);
		}*/
	}
}])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);