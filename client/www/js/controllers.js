<<<<<<< HEAD
angular.module('aha.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Registrar,$location) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.signup = {};

  $scope.appTitle = "@AHA";

  $scope.currentLocation ={
longitude:"",
latitude:"",
getLocation:function(){
console.log("called in location");
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(this.showPosition)
} else {
//x.innerHTML = "Geolocation is not supported by this browser.";
}
},
showPosition:function(position) {
console.log("callback");
console.log(position.coords.longitude);
console.log(position.coords.latitude);
this.longitude= position.coords.longitude;
this.latitude= position.coords.latitude;
}
};
$scope.currentLocation.getLocation();
  if(typeof(Storage) !== "undefined") {
    console.log("storage");
  if( localStorage.getItem("isRegistered")===true) {
    $location.path("/app/home");
  
  } else {
    $location.path("/app/register");
  }}
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

   $scope.currentUser={
isAuthenticated : false,
username : "",
accountType:"",
authenticate : function(){
if(this.isAuthenticated==false)
console.log("auth is false");
//$location.path("/app/login");
},
startApp : function () {
$location.path("/app/home");
console.log("startapp");
},
logout : function(){
this.isAuthenticated=false;
this.username = "";
},
saveUser : function () {
if(typeof(Storage) !== "undefined") {
console.log("storage");
localStorage.setItem("username", this.username);
localStorage.setItem("isRegistered", this.isAuthenticated);
localStorage.setItem("accountType", this.accountType);
} else {
// Sorry! No Web Storage support..
console.log("no storage");
}
}
};
//Handles registration for individuals
$scope.individualSignup = function () {
console.log("individual register called");
var data =$scope.signup.individual;
console.log(data);
var individualResponse = Registrar.register(data,1);
console.log("individual response: "+individualResponse);
/*
myDataPromise.then(function(result) { // this is only run after $http completes
$scope.data = result;
console.log("data.name"+$scope.data.name);
});
*/
individualResponse.then(function(result){
console.log(result);
if(result==1){
console.log("got response 1");
$scope.currentUser.isAuthenticated = true;
$scope.currentUser.username = data.username;
$scope.currentUser.accountType = "individual";
$scope.currentUser.saveUser();
$scope.currentUser.startApp();
}
});
};
//Handles registration for businesses
$scope.businessSignup = function () {
var data = $scope.signup.business;
var businessResponse = Registrar.register(data,2);
console.log("business response"+businessResponse);
businessResponse.then(function(result){
console.log(result);
if(result==1){
console.log("got response 1");
$scope.currentUser.isAuthenticated = true;
$scope.currentUser.username = data.username;
$scope.currentUser.accountType = "business";
$scope.currentUser.saveUser();
$scope.currentUser.startApp();
}
});
};


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UsersCtrl', function($scope, UsersFactory) {
  $scope.users = UsersFactory.getUsersDetails();
})

.controller('UserCtrl', function($scope, $stateParams, UsersFactory) {
  $scope.user = UsersFactory.getUserDetails($stateParams.userName);
  //console.log('Sending username: ' + $scope.username);
  //console.log('Return value: '+UsersFactory.getUserDetails($scope.username).name);
})

.controller('BizsCtrl', function($scope, BizsFactory) {
  $scope.bizs = BizsFactory.getBizsDetails();
  $scope.search = undefined; 
})

.controller('BizCtrl', function($scope, $stateParams, BizsFactory) {
  $scope.biz = BizsFactory.getBizDetails($stateParams.userName);
  console.log("Passing: " + $stateParams.userName);
  //console.log('Sending username: ' + $scope.username);
  //console.log('Return value: '+UsersFactory.getUserDetails($scope.username).name);
})

.controller('SearchForm', function($scope){
  $scope.location = '';

  $scope.doSearch = function(){
      if($scope.location === ''){
          alert('Directive did not update the location property in parent controller.');
      } else {
          alert('Yay. Location: ' + $scope.location);
      }
  };
})

.controller('register', function ($scope) {
console.log("controller register");
});
=======
angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, Registrar,$location) {

        // Form data for the login modal


        $scope.loginData = {};
        $scope.signup = {};


        $scope.currentLocation ={
            longitude:"",
            latitude:"",
            getLocation:function(){
                console.log("called in location");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition)
                } else {
                    //x.innerHTML = "Geolocation is not supported by this browser.";
                }

            },
            showPosition:function(position) {
                console.log("callback");
                console.log(position.coords.longitude);
                console.log(position.coords.latitude);

                this.longitude= position.coords.longitude;
                this.latitude= position.coords.latitude;

            }

        };

        $scope.currentLocation.getLocation();

        if(typeof(Storage) !== "undefined") {
            console.log("storage");
          if(  localStorage.getItem("isRegistered")==true) {
              $location.path("/app/home");
          }
        } else {
            // Sorry! No Web Storage support..
            console.log("no storage");
        }
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });




        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        $scope.currentUser={
            isAuthenticated : false,
            username : "",
            accountType:"",
            authenticate : function(){
                if(this.isAuthenticated==false)
                console.log("auth is false");
                    //$location.path("/app/login");
            },
            startApp : function () {
                //$location.path("/app/home");
                console.log("startapp");
            },
            logout : function(){
                this.isAuthenticated=false;
                this.username = "";
            },
            saveUser : function () {
                if(typeof(Storage) !== "undefined") {
                    console.log("storage");
                    localStorage.setItem("username", this.username);
                    localStorage.setItem("isRegistered", this.isAuthenticated);
                    localStorage.setItem("accountType", this.accountType);

                } else {
                    // Sorry! No Web Storage support..
                    console.log("no storage");
                }
            }
        };

        //Handles registration for individuals
        $scope.individualSignup = function () {
            console.log("individual register called");
            var data =$scope.signup.individual;
            console.log(data);
            var individualResponse = Registrar.register(data,1);
            console.log("individual response: "+individualResponse);
            /*
             myDataPromise.then(function(result) {  // this is only run after $http completes
             $scope.data = result;
             console.log("data.name"+$scope.data.name);
             });
             */
            individualResponse.then(function(result){
                console.log(result);
                if(result==1){
                    console.log("got response 1");
                    $scope.currentUser.isAuthenticated = true;
                    $scope.currentUser.username = data.username;
                    $scope.currentUser.accountType = "individual";
                    $scope.currentUser.saveUser();
                    $scope.currentUser.startApp();
                }
            });

        };

        //Handles registration for businesses
        $scope.businessSignup = function () {
            var data = $scope.signup.business;
            var businessResponse = Registrar.register(data,2);
            console.log("business response"+businessResponse);

            businessResponse.then(function(result){
                console.log(result);
                if(result==1){
                    console.log("got response 1");
                    $scope.currentUser.isAuthenticated = true;
                    $scope.currentUser.username = data.username;
                    $scope.currentUser.accountType = "business";
                    $scope.currentUser.saveUser();
                    $scope.currentUser.startApp();
                }
            });

        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('register', function ($scope) {
        console.log("controller register");
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
>>>>>>> 688d270ae1e3654b1dfd209eae76e3abbacbab93
