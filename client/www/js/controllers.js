angular.module('aha.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Registrar,$location) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.signup = {};
  $scope.resultsDisplayed = 2;
  $scope.loadMore = function () {
      $scope.resultsDisplayed += 2;  
  };
  $scope.resetMore = function () {
      $scope.resultsDisplayed = 2;  
  };

  $scope.appTitle = "@AHA";

  $scope.currentLocation ={
      longit:"",
      latit:"",
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
        $scope.currentLocation.longit= position.coords.longitude;
        $scope.currentLocation.latit= position.coords.latitude;
      }
};
$scope.currentLocation.getLocation();
console.log("Latitude: "+ $scope.currentLocation.latit);
  if(typeof(Storage) !== "undefined") {
    console.log("storage");
  if(localStorage.getItem("isRegistered")==="true") {
    if(localStorage.getItem("accountType")==="individual")
      $location.path("/app/home");
    else
      $location.path("/app/bizhome");
  
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

.controller('BizCtrl', function($scope, $stateParams,$http, $filter, BizsFactory) {
  $scope.biz = BizsFactory.getBizDetails($stateParams.userName);
  console.log("Sending: " + $stateParams.userName);
  $http.get('http://128.199.54.243:3000/hitbusiness?user='+$scope.biz.username);
  $scope.today = new Date();
  console.log('Today: '+$scope.today);
  $scope.nowTime = $filter('date')($scope.today, 'HH:mm', 'UTC');
  console.log("Formatted: " + $scope.nowTime);
  $scope.nowSec = function(){
    var times = $scope.nowTime.split(":");
    var hours = times[0];
    var minutes = times[1];
    var seconds = (parseInt(minutes, 10)*60) + (parseInt(hours, 10) * 3600);
    console.log("Now: "+seconds);
    return seconds; 
  };

  $scope.weekdStart = function(){
    var times = $scope.biz.startWD.split(":");
    var hours = times[0];
    var minutes = times[1];
    var seconds = (parseInt(minutes, 10)*60) + (parseInt(hours, 10) * 3600);
    console.log("weekdStart: "+seconds);
    return seconds; 
  };
//128.199.54.243:3000/getdrivetime?olat=121&olon=433&dlat=324&dlon=531
  $scope.weekdEnd = function(){
    var times = $scope.biz.endWD.split(":");
    var hours = times[0];
    var minutes = times[1];
    var seconds = (parseInt(minutes, 10)*60) + (parseInt(hours, 10) * 3600);
    console.log("weekdEnd: "+seconds);
    return seconds; 
  };

  $scope.weekeStart = function(){
    var times = $scope.biz.startWE.split(":");
    var hours = times[0];
    var minutes = times[1];
    var seconds = (parseInt(minutes, 10)*60) + (parseInt(hours, 10) * 3600);
    console.log("weekeStart: "+seconds);
    return seconds; 
  };

  $scope.weekeEnd = function(){
    var times = $scope.biz.endWE.split(":");
    var hours = times[0];
    var minutes = times[1];
    var seconds = (parseInt(minutes, 10)*60) + (parseInt(hours, 10) * 3600);
    console.log("WeekeEnd: "+seconds);
    return seconds; 
  };
  $scope.isOpen = function(){
    console.log("nowSec: "+$scope.nowSec()+" weekdStart: "+$scope.weekdStart()+" weekdEnd: "+ $scope.weekdEnd());
    if($scope.nowSec() > $scope.weekdStart() && $scope.nowSec() < $scope.weekdEnd())
      return true;
    else
      return false;
  };
  console.log("Open: " + $scope.isOpen());
  $scope.open = $scope.isOpen();
  
})

.controller('register', function ($scope) {
console.log("controller register");
});
