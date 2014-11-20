angular.module('aha.factories', [])
    .factory('UsersFactory', function () {

        var UsersDetails = [
            {name: 'Kpetermeni Siakor', id: 1, username: '@kpetermeni', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
            {name: 'Shamir Adjaku', id: 2, username: '@shamireyram', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
            {
                name: 'Senanu Fiam-Coblavie',
                id: 3,
                username: '@senanufc',
                pic: 'img/mcfly.jpg',
                full: 'img/delorean.jpg'
            },
            {name: 'Sheila Plange', id: 4, username: '@missplange', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
            {name: 'Sharon Melomey', id: 5, username: '@mawuena', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
            {name: 'Unconfirmed Person', id: 6, username: '@tanzania', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'}
        ];

        var UsersList = [
            {name: 'Kpetermeni Siakor', username: '@kpetermeni', distance: 222},
            {name: 'Shamir Adjaku', username: '@shamireyram', distance: 100},
            {name: 'Senanu Fiam-Coblavie', username: '@senanufc', distance: 180},
            {name: 'Sheila Plange', username: '@missplange', distance: 110},
            {name: 'Sharon Melomey', username: '@mawuena', distance: 380},
            {name: 'Unconfirmed Person', username: '@tanzania', distance: 242}

        ];


        var factory = {};
        factory.getUsersList = function () {
            return UsersList;
        };



        factory.getUserDetails = function (username) {
            var userDetails = "";
            angular.forEach(UsersDetails, function (value, key) {
                console.log('Username is: ' +
                username);
                if (angular.equals(value.username, username))
                    userDetails = value;
                // else
                // 	//userDetails = "Nothing found";
                // 	console.log("Value: " + value.username + " Param: " + username);
                // 	//return "Nothing Found";
            });

            return userDetails;
        };

        factory.getUsersDetails = function (data) {
            console.log(data);
            return UsersDetails;
        };
        factory.postPerson = function (person) {

        };
        return factory;
    })

    .factory('Registrar', function ($http) {
        var url = "http://128.199.54.243:3000";
        var path;
        var factory = {};
        // var response;
        factory.register = function (data, accountType) {
            console.log("register called");
            if (accountType == 1) {
                path = "/registerindividual?" +
                "user=" + data.username + "" +
                "&fname=" + data.firstName +
                "&lname=" + data.lastName +
                "&phone=" + data.phoneNumber;
                console.log("individual url " + url + path);
                //$http.get(url + path)
                //    .success(function (response) {
                //        console.log(response);
                //        if (response == 1) {
                //            return 1;
                //        }
                //        else {
                //            return 0;
                //        }
                //    });
                return $http({method:"GET", url:url+path}).then(function(result){
                    return result.data;
                });
                //console.log("individual registered response " + response);
                //return response;
            }
            else if (accountType == 2) {
                path = "/registerbusiness?" +
                "user=" + data.businessHandle +
                "&name=" + data.businessName +
                "&address=" + data.businessAddress +
                "&city=" + data.city +
                "&email=" + data.email +
                "&phone=" + data.phoneNumber +
                "&description=" + data.description +
                "&website=" + data.website;
                console.log(url + path);
                //$http.get(url + path)
                //    .success(function (response) {
                //        console.log(response);
                //        if (response == 1) {
                //            return 1;
                //        }
                //        else {
                //            return 0;
                //        }
                //    });
                return $http({method:"GET", url:url+path}).then(function(result){
                    return result.data;
                });
                //console.log("business registered response " + response);
                //return response;
            }
            else {
                console.log("invalid registration data");
                return 0;
            }
        };
        return factory;
    });