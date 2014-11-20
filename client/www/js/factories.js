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
		{ name: 'Ashesi University College', username: '@Ashesi', address: "1 University Avenue, Berekuso, Greater Accra, Ghana", phone: '0302-674-583',  lat: 5.759279, lon: -0.2200910000000249, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/ashesil.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company."},
	    { name: 'Papaye Fast Foods', username: '@Papaye',address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.55966, lon: -0.1820470000000114, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company."},
	    { name: 'National Theatre', username: '@NatTheatre', address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.55, lon: -0.20000000000004547, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company."},
	    { name: 'Accra Mall', username: '@AccraMall', address: "Vodafone Ghana Head Quarters, Airport By-Pass road, Accra, Greater Accra, Ghana", phone: '0302-674-583', lat: 5.621714, lon: -0.1736879999999701, pic: 'img/mcfly.jpg', full: 'img/delorean.jpg', logo: 'img/delorean.jpg', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company."},
	    { name: 'Vodafone Ghana', address: "Vodafone Ghana Headquarters, Airport By-Pass road, Accra, Greater Accra, Ghana", username: '@Vodafone', phone: '0302-100-000', lat: 5.599984, lon: -0.17611399999998412, pic: 'img/mcfly.jpg', full: 'img/vodafone.jpg', logo: 'img/logo.png', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company."}
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
});