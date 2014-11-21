// Ionic aha App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'aha' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'aha.controllers' is found in controllers.js
angular.module('aha', ['ionic', 'aha.controllers', 'aha.factories', 'aha.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "BizsCtrl"
        }
      }
    })
    .state('app.users', {
      url: "/users",
      views: {
        'menuContent' :{
          templateUrl: "templates/users.html",
          controller: "UsersCtrl"
        }
      }
    })

    .state('app.user', {
      url: "/users/:userName",
      views: {
        'menuContent' :{
          templateUrl: "templates/user.html",
          controller: 'UserCtrl'
        }
      }
    })

    .state('app.user.name', {
      url: "/name/{name}",
      views: {
        'menuContent' :{
          templateUrl: "templates/user.html",
          controller: 'UserCtrl'
        }
      }
    })
    .state('app.register', {
url: "/register",
views: {
'menuContent': {
templateUrl: "templates/register.html",
controller: 'register'
}
}
})
    .state('app.bizs', {
      url: "/bizs",
      views: {
        'menuContent' :{
          templateUrl: "templates/bizs.html",
          controller: "BizsCtrl"
        }
      }
    })
    .state('app.biz', {
      url: "/bizs/:userName",
      views: {
        'menuContent' :{
          templateUrl: "templates/biz.html",
          controller: 'BizCtrl'
        }
      }
    })

    .state('app.biz.name', {
      url: "/name/{name}",
      views: {
        'menuContent' :{
          templateUrl: "templates/biz.html",
          controller: 'BizCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

