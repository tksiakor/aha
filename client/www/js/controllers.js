angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, Registrar,$location) {

        // Form data for the login modal
        $scope.loginData = {};
        $scope.signup = {};

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
