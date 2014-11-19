angular.module('aha.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $timeout) {

})

.controller('HomeCtrl', function($scope) {
  
})

.controller('UsersCtrl', function($scope) {
  $scope.allusers = {name: "Kpetermeni" username: "tksiakor"}
})

.controller('UserCtrl', function($scope, $routeParams) {
  $scope.username = $routeParams.userName;
})

.controller('LocationsCtrl', function($scope) {
  
});
