angular.module('aha.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.appTitle = "@AHA";

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
});
