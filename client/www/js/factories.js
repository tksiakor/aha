angular.module('aha.factories', [])
<<<<<<< HEAD
.factory('UsersFactory', function () {
		
	var UsersDetails = [
	    { name: 'Kpetermeni Siakor', id: 1, username: '@kpetermeni', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Shamir Adjaku', id: 2, username: '@shamireyram', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Senanu Fiam-Coblavie', id: 3, username: '@senanufc', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Sheila Plange', id: 4 , username: '@missplange', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Sharon Melomey', id: 5, username: '@mawuena', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Unconfirmed Person', id: 6, username: '@tanzania', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'}
	];

	var factory = {};

	factory.getUserDetails = function(username){
		var userDetails = "";
		angular.forEach(UsersDetails, function(value, key){
			console.log('Username is: '+ username);
			if(angular.equals(value.username,username))
				userDetails = value;
			// else
			// 	//userDetails = "Nothing found";
			// 	console.log("Value: " + value.username + " Param: " + username);
			// 	//return "Nothing Found";
		});

		return userDetails;
	};

	factory.getUsersDetails = function(){
		return	UsersDetails;
	};

	return factory;
})
.factory('BizsFactory', function () {
	
	var BizsDetails = [
		{ name: 'Ashesi University College', username: '@Ashesi', address: "1 University Avenue, Berekuso, Greater Accra, Ghana", phone: '0302-674-583',  lat: 5.759279, lon: -0.2200910000000249, pic: 'img/ashesil.jpg', full: 'img/ashesi-full.jpg', logo: 'img/ashesil.jpg', desc: "Ashesi University is a coeducational institution whose goal is to educate African leaders of exceptional integrity and professional ability.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Papaye Fast Foods', username: '@Papaye',address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.55966, lon: -0.1820470000000114, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'National Theatre', username: '@NatTheatre', address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.55, lon: -0.20000000000004547, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Accra Mall', username: '@AccraMall', address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.621714, lon: -0.1736879999999701, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Vodafone Ghana', address: "Vodafone Ghana Headquarters, Airport By-Pass road, Accra, Greater Accra, Ghana", username: '@Vodafone', phone: '0302-100-000', lat: 5.599984, lon: -0.17611399999998412, pic: 'img/mcfly.jpg', full: 'img/vodafone.jpg', logo: 'img/logo.png', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'}
	];

	var factory = {};

	factory.getBizDetails = function(username){
		var bizDetails = "";
		angular.forEach(BizsDetails, function(value, key){
			console.log('BizName is: '+ username);
			if(angular.equals(value.username,username))
				bizDetails = value;
		});
		return bizDetails;
	};
	
	factory.getBizsDetails = function(){
		return BizsDetails;
	};
	return factory;
})

.factory('Registrar', function ($http) {
var url = "http://128.199.54.243:3000";
var path;
var factory = {};
factory.register = function (data, accountType) {
console.log("register called");
if (accountType == 1) {
path = "/registerindividual?" +
"user=" + data.username + "" +
"&fname=" + data.firstName +
"&lname=" + data.lastName +
"&phone=" + data.phoneNumber;
console.log("individual url " + url + path);
return $http({method:"GET", url:url+path}).then(function(result){
return result.data;
});
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
return $http({method:"GET", url:url+path}).then(function(result){
return result.data;
});
}
else {
console.log("invalid registration data");
return 0;
}
};
return factory;
});
=======
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
        factory.register = function (data, accountType) {
            console.log("register called");
            if (accountType == 1) {
                path = "/registerindividual?" +
                "user=" + data.username + "" +
                "&fname=" + data.firstName +
                "&lname=" + data.lastName +
                "&phone=" + data.phoneNumber;
                console.log("individual url " + url + path);
                return $http({method:"GET", url:url+path}).then(function(result){
                    return result.data;
                });
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
                return $http({method:"GET", url:url+path}).then(function(result){
                    return result.data;
                });
            }
            else {
                console.log("invalid registration data");
                return 0;
            }
        };
        return factory;
    });
>>>>>>> 688d270ae1e3654b1dfd209eae76e3abbacbab93
