// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('aha', ['ionic', 'starter.controllers','aha.factories'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //receivedEvent('deviceready');
            //if (window.plugins.backgroundGeoLocation) {
            //    configureBackgroundGeoLocation();
            //
            //}

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
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
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

<<<<<<< HEAD
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
=======
            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
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
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html"
                        //controller: 'register'
                    }
                }
            })
>>>>>>> 688d270ae1e3654b1dfd209eae76e3abbacbab93

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/register');
    });
