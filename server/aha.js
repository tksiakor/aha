
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var gen = require('ical-generator'),
	http = require('http');
var gm = require('googlemaps');
var util = require('util');	
//ar geolib = require('geolib');
mongoose.plugin(require('mongoose-list'));

	
mongoose.connect('mongodb://127.0.0.1/ahaSchema'); 

app.set('port', process.env.PORT || 3000);

//*******GOOGLE MAPS**********

//Configuration
// gm._config{
// 	google-client-id:"928051853607-dl8q6vnuv8f9k05cr20a41aku9co3n7a.apps.googleusercontent.com",
// 	google-private-key:"AIzaSyDLoNzd2UM1i868hVkYXeyLFg7fDbubl0Y"
// }
//gm.config('google-client-id','928051853607-mf08ihadgp8ggqo24cj03vcgg4f4kk0b.apps.googleusercontent.com');
gm.config('key',"AIzaSyDLoNzd2UM1i868hVkYXeyLFg7fDbubl0Y");

//To get directions from a given location to another
app.get('/getdirection', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	gm.directions(''+req.param("olat")+','+req.param("olong"), req.param("dlat")+','+req.param("dlong") ,function(err, data){
	//gm.directions('5.6206,-0.1743', '5.7454954,0.106685' ,function(err, data){
		if(err){

			console.log(err);

		}
		res.send(JSON.stringify(data));
	}) 

})


//To get time from a given location to another
app.get('/getdrivetime', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	gm.directions(''+req.param("olat")+','+req.param("olong"), req.param("dlat")+','+req.param("dlong") ,function(err, data){
	// gm.directions('5.6206,-0.1743', '5.7454954,0.106685' ,function(err, data){
		if(err){
			console.log(err);
			res.end("0");

		}
		else{
		res.send(data.routes[0].legs[0].duration.text);
	}
	}) 

})



//STRUCTURES************************
//business entity Schema definition
var businessSchema = new mongoose.Schema({
	buser:{type:String, unique:true},
	bname:{type:String},
	baddress:{type:String},
	bcity:{type:String},
	bemail:{type:String},
	bphone:{type:String},
	bconfirmphone:{type:String},
	bdescription:{type:String},
	type:{type:String},
	blat:{type:Number},
	blong:{type:Number},
	bwebsite:{type:String},
	hits:{type:Number},
	hitstoday:{type:Number},
	weekend_open:{type:String},
	weekend_close:{type:String},
	weekday_open:{type:String},
	weekday_close:{type:String},
	logo:{type:String},
	pic:{type:String}


})

//individuals schema definition
var individualSchema = new mongoose.Schema({
	iuser:{type:String, unique:true},
	fname:{type:String},
	lname:{type:String},
	iaddress:{type:String},
	icity:{type:String},
	iemail:{type:String},
	iphone:{type:String},
	iconfirmphone:{type:String},
	ilat:{type:Number},
	ilong:{type:Number},
	hits:{type:Number},
	pic:{type:String}

})

//Sites schema definition //UNDEFINED
var siteSchema = new mongoose.Schema({
	registeredby:{type:String},
	sname:{type:String},
	address:{type:String},
	slat:{type:Number},
	slong:{type:Number},
	hits:{type:Number},
	pic:{type:String}

})

//MODELS*************************
var businessUser = mongoose.model('BUser', businessSchema, "BUser" );
var individualUser = mongoose.model('IUser', individualSchema, "IUser");
var site = mongoose.model('Site', siteSchema, 'Site'); //UNUSED



//*********************METHODS******************

//**Business User Methods**

//To register a Business
app.get('/registerbusiness', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	businessUser.create({
		buser:''+req.param("user"),
		bname:''+req.param("name"),
		baddress:''+req.param("address"),
		bcity:''+req.param("city"),
		bemail:''+req.param("email"),
		bphone:''+req.param("phone"),
		type:''+req.param("type"),
		bconfirmphone:000,
		bdescription:''+req.param("description"),
		blat:0,
		blong:0,
		bwebsite:''+req.param("website"),
		hits:0,
	   	pic:''+req.param("pic"),
	   	weekend_open:''+req.param("weekend_open"),
		weekend_close:''+req.param("weekend_close"),
		weekday_open:''+req.param("weekday_open"),
		weekday_close:''+req.param("weekday_close")
	}, function (err, bname) {

	  if(err){
		console.log(err);
		console.log("There's a problem with registering somewhere... Find it!");
		res.end("0");
	  }
	  else{
	  console.log(bname + " has been added to the db");
	  res.end("1");
	}
 })
})


//To check business username availability
app.get('/authbusinessname', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
	   businessUser.findOne({ buser: ''+req.param("user") }, function(err, user) {
			if (user.buser === (''+req.param("user"))) {
				// ... user is legit
				console.log("user found");
				res.end("1");
			}
			else{
			console.log("user not found");
			res.end("0");
		}
	 })
})

//To update business profile
app.get('/updatebusiness', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
	   businessUser.findOneAndUpdate({ buser: ''+req.param("user") },{bemail:''+req.param("email"), baddress: ''+req.param("address"), bcity: ''+req.param("city"), bphone: ''+req.param("phone"), description: ''+req.param("description")}, function(err) {
			if (err) {
				// ... user is legit
				console.log("err");
				res.end("0");
			}
			else{
			console.log("Updated");
			res.end("1");
		}
	 })
})

//To set Business Coordinates
app.get('/setbcoordinates', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	businessUser.findOneAndUpdate({buser:req.param("user")}, {blat:req.param("lat"),blong:req.param("long")},function(err){
		if(err){
			console.log(err);
			res.end("Failed to Update");
		}
		else
		{
			res.end("Updated");
		}
	})

})



//To get Business by Name
app.get('/getbusiness', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("name"), 'i');  // 'i' makes it case insensitive
	businessUser.findOne({ bname: regex }, function(err, user) {
			res.send(user);
		}
	)
})

//To get Businesses by Name
app.get('/getbusinesses', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("name"), 'i');  // 'i' makes it case insensitive
	businessUser.find({ bname:regex }, function(err, user) {
			res.send(user);
		}
	)
})

//To retrieve all Businesses
app.get('/getallbusinesses', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	businessUser.find(function(err, businessUsers){
		res.send(businessUsers);
	})
})

//To update Business hits
app.get('/hitbusiness', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	businessUser.findOneAndUpdate({buser:req.param("user")}, {$inc:{hits:1, hitstoday:1}},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})

})


//To reset today hits
app.get('/resettodayhits', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	businessUser.findOneAndUpdate({buser:req.param("user")}, {hitstoday:0},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To save Business pic
app.get('/savebusinesspic', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({buser:req.param("user")}, {pic:req.param("pic")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To save Business logo
app.get('/savebusinesslogo', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({buser:req.param("user")}, {logo:req.param("logo")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})


//To set weekend times
app.get('/setweekend', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({buser:req.param("user")}, {weekend_open:req.param("weekend_open"),weekend_close:req.param("weekend_close")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To set weekday times
app.get('/setweekday', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({buser:req.param("user")}, {weekday_open:req.param("weekday_open"),weekday_close:req.param("weekday_close")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To get 5 top hit businesses
app.get('/gettopbusinesses', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	businessUser.list({start:0, limit:5, sort:'-hits'},function(err, count, user){
	if (err) throw err;
	console.log('found' + count + 'users');	
		res.send(user);
	})
})




//**Individual User Methods**

//To register an Individual
app.get('/registerindividual', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	individualUser.create({
		iuser:''+req.param("user"),
		fname:''+req.param("fname"),
		lname:''+req.param("lname"),
		iaddress:''+req.param("address"),
		icity:''+req.param("city"),
		iemail:''+req.param("email"),
		iphone:''+req.param("phone"),
		iconfirmphone:000,
		ilat:0,
		ilong:0,
		hits:0,
		//pic:''+req.param("pic")          

	}, function (err, iname) {

	  if(err){
		console.log(err);
		console.log("There's a problem with registering somewhere... Find it!");
		res.end("0");
	  }
	  else{
	  console.log(iname + " has been added to the db");
	  res.end("1");
	}
	})
})

//To check individual username availability
app.get('/authindividualname', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
	   individualUser.findOne({ iuser: ''+req.param("user") }, function(err, user) {
			if (user.iuser === (''+req.param("user"))) {
				// ... user is legit
				console.log("user found");
				res.end("1");
			}
			else{
			console.log("user not found");
			res.end("0");
		}
	 })
})


//To update individual profile
app.get('/updateindividual', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
	   individualUser.findOneAndUpdate({ iuser: ''+req.param("user") },{fname:''+req.param("fname"), lname: ''+req.param("lname"), iphone: ''+req.param("phone")}, function(err) {
			if (err) {
				// ... user is legit
				console.log("err");
				res.end("0");
			}
			else{
			console.log("Updated");
			res.end("1");
		}
	 })
})

//To set Individual Coordinates
app.get('/seticoordinates', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	individualUser.findOneAndUpdate({iuser:req.param("user")}, {ilat:req.param("lat"),ilong:req.param("long")},function(err){
		if(err){a
			console.log(err);
			res.end("Failed to Update");
		}
		else
		{
			res.end("Updated");
		}
	})

})

//To get Individual info
app.get('/getindividual', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("user"), 'i');  // 'i' makes it case insensitive

	individualUser.findOne({ iuser: regex }, function(err, user) {
			res.send(user);
		}
	)
})

//To get Individuals by user
app.get('/getindividuals', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("user"), 'i');  // 'i' makes it case insensitive
	individualUser.find({ iuser:regex }, function(err, user) {
			res.send(user);
		}
	)
})

//To retrieve all Individual Users
app.get('/getallindividual', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	individualUser.find(function(err, individualUsers){
		res.send(individualUsers);
	})

})

//To get Individuals by Name
app.get('/getindividualsbyname', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("name"), 'i');  // 'i' makes it case insensitive
	individualUser.find({$or:[{ fname:regex }, {lname:regex}]}, function(err, user) {
			res.send(user);
		}
	)
})

//To update Individual hits
app.get('/hitindividual', function(req, res){
	individualUser.findOneAndUpdate({iuser:req.param("user")}, {hits:req.param("hits")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To save Individual pic
app.get('/saveindividualpic', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({iuser:req.param("user")}, {pic:req.param("pic")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})


//**Site Methods**
//To register a site
app.get('/registersite', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	site.create({
		registeredby:''+req.param("user"),
		sname:''+req.param("name"),
		address:''+req.param("address"),
		slat:''+req.param("lat"),
		slong:''+req.param("long"),
		hits:0,
		pic:""


	}, function (err, bname) {

	  if(err){
		console.log(err);
		console.log("There's a problem with registering somewhere... Find it!");
		res.end("0");
	  }
	  else{
	  console.log(bname + " has been added to the db");
	  res.end("1");
	}
	})
})



//To set Site Coordinates
app.get('/setscoordinates', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");

	site.findOneAndUpdate({sname:req.param("name")}, {slat:req.param("lat"),slong:req.param("long")},function(err){
		if(err){a
			console.log(err);
			res.end("Failed to Update");
		}
		else
		{
			res.end("Updated");
		}
	})

})

//To get Site info
app.get('/getsite', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("name"), 'i');  // 'i' makes it case insensitive

	site.findOne({sname: regex }, function(err, user) {
			res.send(user);
		}
	)
}) 

//To get Sites by name
app.get('/getsites', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("name"), 'i');  // 'i' makes it case insensitive
	site.find({ sname:regex }, function(err, user) {
			res.send(user);
		}
	)
})

//To retrieve all Sites 
app.get('/getallsites', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	site.find(function(err, Sites){
		res.send(Sites);
	})

})

//To get Sites by Users who sited
app.get('/getsitesbyuser', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var regex = new RegExp(''+req.param("user"), 'i');  // 'i' makes it case insensitive
	site.find({$or:[{ registeredby:regex }, {lname:regex}]}, function(err, user) {
			res.send(user);
		}
	)
})

//To update Site hits
app.get('/hitsite', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	businessUser.findOneAndUpdate({sname:req.param("name")}, {hits:req.param("hits")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})

//To save Site pic
app.get('/savesitepic', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	 businessUser.findOneAndUpdate({sname:req.param("name")}, {pic:req.param("pic")},function(err){
		if(err){
			console.log(err);
			res.end("0");
		}
		else
		{
			res.end("1");
		}
	})
})


app.get('/printmap', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	
//gm.directions('5.6206,-0.1743', '5.7454954,0.106685'

	var origin =req.param("olat")+','+req.param("olong");
	var destination =req.param("dlat")+','+req.param("dlong");
	var mid = ((((parseFloat(req.param("olat")))+parseFloat(req.param("dlat")))/2)+','+((parseFloat(req.param("olong"))+parseFloat(req.param("dlong")))/2));
	markers = [

    { 'location': origin},
    { 'location': destination,
        'color': 'yellow',
        'label': 'A',
        'shadow': 'false',
        'icon' : 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=2.1|0|FFFF42|13|b|AH@'
    }
]

styles = [
    { 'feature': 'road', 'element': 'all', 'rules': 
        { 'hue': '0x00ff00' }
    }
]

paths = [
    { 'color': '0xFF0000', 'weight': '2', 'points': 
        [ origin, destination]
    }
]

console.log("Outing map....");
	res.send(gm.staticMap(mid, 14, '500x400', false, false, 'roadmap', markers, styles, paths));
})





http.createServer(app).listen(app.get('port'), function(){
	console.log('Port:' + app.get('port'))
});

