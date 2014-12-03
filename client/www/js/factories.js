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
.factory('BizsFactory', function ($http) {
	// var url = "http://128.199.54.243:3000";
	// var path="/getallbusinesses";
	var BizsDetails = [
		{ name: 'Ashesi University College', username: '@Ashesi',website:"www.ashesi.edu.gh" , address: "1 University Avenue, Berekuso, Eastern Region, Ghana", phone: '0302610330',  lat: 5.759279, lon: -0.2200910000000249, pic: 'img/ashesil.jpg', full: 'img/ashesi-full.jpg', logo: 'img/ashesil.jpg', desc: "Ashesi University is a coeducational institution whose goal is to educate African leaders of exceptional integrity and professional ability.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Papaye Fast Foods', username: '@Papaye',website:"www.papayegroup.com" ,address: "Papaye Fast Foods Ltd, Oxford Street, Osu, Accra, Greater Accra, Ghana", phone: '0302810990', lat: 5.55966, lon: -0.1820470000000114, pic: 'img/papaye_full.jpg', full: 'img/papaye_full.jpg', logo: 'img/logo_papaye.jpg', desc: "Papaye Restaurant a family restaurants committed to providing every guest with a genuine African dining experience.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'National Theatre', username: '@NatlTheatre',website:"www.nationaltheatre.com.gh" ,address: "National Theatre Ghana, South Liberia Road, Accra 12345, Ghana", phone: '0302663449', lat: 5.55, lon: -0.20000000000004547, pic: 'img/natl_full.jpg', full: 'img/natl_full.jpg', logo: 'img/natl_logo.jpeg', desc: "The National Theatre, opened in 1992 and located in the Victoriaborg district of Accra, Ghana, was built by the Chinese and offered as a gift to Ghana.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Accra Mall', username: '@AccraMall',website:"www.accramall.info" ,address: "Spintex Rd, Accra, Greater Accra, Ghana", phone: '+233302823041', lat: 5.621714, lon: -0.1736879999999701, pic: 'img/accramall.jpeg', full: 'img/accramall.jpeg', logo: 'img/accram_logo.jpg', desc: "The Accra Mall is a shopping center in Accra, Ghana. The mall was commissioned on the 4th of July 2008.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'},
	    { name: 'Vodafone Ghana',website:"www.vodafone.com.gh" ,address: "Vodafone Ghana Headquarters, Airport By-Pass road, Accra, Greater Accra, Ghana", username: '@Vodafone', phone: '+233302552552', lat: 5.599984, lon: -0.17611399999998412, pic: 'img/mcfly.jpg', full: 'img/vodafone.jpg', logo: 'img/logo.png', desc: "Vodafone in Ghana is one of the latest additions to Vodafone Group Plc, the world's leading mobile telecommunications company.", startWD: '08:30', endWD: '17:00', startWE: '10:00', endWE: '15:00'}
	];	
	// var BizsDetails={};
	var factory = {};
	// var BizsDetailsGetter

	factory.getBizDetails = function(username){
		var bizDetails = "";
		angular.forEach(BizsDetails, function(value, key){
			console.log('BizName is: '+ username);
			if(angular.equals(value.username,username))
				bizDetails = value;
		});
		return bizDetails;
	};
// 	factory.updateBizDetails = function(){
// 		return $http({method:"GET", url:url+path}).then(function(result){
// 			// return result.data;
// 			BizsDetails =result.data;
// });
// 	}
	
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