/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $cordovaOauth, $location, ngFB) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.login = function() {
        ngFB.login({scope: 'email'}).then(
            function (response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    $scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            });
    };
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('ChatCtrl',function($scope,$stateParams,socket,$sanitize,$ionicScrollDelegate,$timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    $scope.connected = false;

    //$scope.op={};

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });


    //var $scope=this;
    $scope.typing = false;
    $scope.lastTypingTime;
    $scope.TYPING_TIMER_LENGTH = 400;

    //Add colors
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
      ];


    $scope.chat = {};
     //initializing messages array
    $scope.messages=[];

    socket.on('connect',function(){

      $scope.connected = true;

      //Add user
      socket.emit('add user', $stateParams.nickname);

      // On login display welcome message
      socket.on('login', function (data) {
        //Set the value of connected flag
        $scope.connected = true
        $scope.number_message= message_string(data.numUsers)

      });

      // Whenever the server emits 'new message', update the chat body
      socket.on('new message', function (data) {
        if(data.message&&data.username)
        {
            addMessageToList(data.username,true,data.message)
        }
      });

      // Whenever the server emits 'user joined', log it in the chat body
      socket.on('user joined', function (data) {
        addMessageToList("",false,data.username + " joined")
        addMessageToList("",false,message_string(data.numUsers))
      });

      // Whenever the server emits 'user left', log it in the chat body
      socket.on('user left', function (data) {
        addMessageToList("",false,data.username+" left")
        addMessageToList("",false,message_string(data.numUsers))
      });

      //Whenever the server emits 'typing', show the typing message
      socket.on('typing', function (data) {
        addChatTyping(data);
      });

      // Whenever the server emits 'stop typing', kill the typing message
      socket.on('stop typing', function (data) {
        removeChatTyping(data.username);
      });
    })

    //function called when user hits the send button
    $scope.sendMessage=function(){
        socket.emit('new message', $scope.chat.message)
        addMessageToList($stateParams.nickname,true,$scope.chat.message)
        socket.emit('stop typing');
        $scope.message = ""
    }

    //function called on Input Change
    $scope.updateTyping=function(){
        sendUpdateTyping()
    }

    // Display message by adding it to the message list
    function addMessageToList(username,style_type,message){
        username = $sanitize(username)
        removeChatTyping(username)
        var color = style_type ? getUsernameColor(username) : null
        $scope.messages.push({content:$sanitize(message),style:style_type,username:username,color:color})
        $ionicScrollDelegate.scrollBottom();
    }

    //Generate color for the same user.
    function getUsernameColor (username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
           hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    // Updates the typing event
    function sendUpdateTyping(){
        if($scope.connected){
            if (!$scope.typing) {
                $scope.typing = true;
                socket.emit('typing');
            }
        }
        $scope.lastTypingTime = (new Date()).getTime();
        $timeout(function () {
            var typingTimer = (new Date()).getTime();
            var timeDiff = typingTimer - $scope.lastTypingTime;
            if (timeDiff >= $scope.TYPING_TIMER_LENGTH && $scope.typing) {
              socket.emit('stop typing');
              $scope.typing = false;
            }
        }, $scope.TYPING_TIMER_LENGTH)
    }

    // Adds the visual chat typing message
    function addChatTyping (data) {
        addMessageToList(data.username,true," is typing");
    }

    // Removes the visual chat typing message
    function removeChatTyping (username) {
        $scope.messages = $scope.messages.filter(function(element){return element.username != username || element.content != " is typing"})
    }

    // Return message string depending on the number of users
    function message_string(number_of_users)
    {
        return number_of_users === 1 ? "there's 1 participant":"there are " + number_of_users + " participants"
    }

})

.controller('PruebaCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, socket,DataPrueba) {

    $scope.formData = {};
    $scope.loading = true;
    
    socket.on('datoPrueba', function (data) {
        $scope.mensaje = data.mensaje;
        
        /*UmaEye.save({data: {stemp:1,sph:2,sconduc:3,sdureza:4}},function(data){
            console.log(data);
            
        });*/
        //$scope.uma = UmaEye.query();
        console.log("El mensaje !!!! "+$scope.mensaje);
       
    });

    $scope.DataPrueba = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            DataPrueba.prueba($scope.formData)

                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    //$scope.todos = data; // assign our new list of todos
                });
        }
    };
});
