angular.module('aha.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

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

.controller('UsersCtrl', function($scope) {
  $scope.users = [
    { name: 'Kpetermeni Siakor', id: 1, username: '@kpetermeni' },
    { name: 'Shamir Adjaku', id: 2, username: '@shamireyram' },
    { name: 'Senanu Fiam-Coblavie', id: 3, username: '@senanufc' },
    { name: 'Sheila Plange', id: 4 , username: '@missplange'},
    { name: 'Sharon Melomey', id: 5, username: '@mawuena' },
    { name: 'Unconfirmed Person', id: 6, username: '@tanzania' }
  ];
})

.controller('UserCtrl', function($scope, $stateParams) {
  $scope.username = $stateParams.userName;
});
