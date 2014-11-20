angular.module('aha.factories', [])
.factory('UsersFactory', function () {
		
	var UsersDetails = [
	    { name: 'Kpetermeni Siakor', id: 1, username: '@kpetermeni', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Shamir Adjaku', id: 2, username: '@shamireyram', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Senanu Fiam-Coblavie', id: 3, username: '@senanufc', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Sheila Plange', id: 4 , username: '@missplange', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Sharon Melomey', id: 5, username: '@mawuena', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'},
	    { name: 'Unconfirmed Person', id: 6, username: '@tanzania', pic: 'img/mcfly.jpg', full: 'img/delorean.jpg'}
	];

	var UsersList = [
		{ name: 'Kpetermeni Siakor', username: '@kpetermeni', distance: 222},
	    { name: 'Shamir Adjaku', username: '@shamireyram', distance: 100},
	    { name: 'Senanu Fiam-Coblavie', username: '@senanufc', distance: 180},
	    { name: 'Sheila Plange', username: '@missplange', distance: 110},
	    { name: 'Sharon Melomey', username: '@mawuena', distance: 380},
	    { name: 'Unconfirmed Person', username: '@tanzania', distance: 242}

	];

	

	var factory = {};
	factory.getUsersList = function(){
		return UsersList;
	};
	
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
	factory.postPerson = function(person){

	};
	return factory;
});