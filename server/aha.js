
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var gen = require('ical-generator'),
	http = require('http');
	
mongoose.connect('mongodb://127.0.0.1/ahaSchema'); 

app.set('port', process.env.PORT || 3000);


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
	blat:{type:Number},
	blong:{type:Number},
	bwebsite:{type:String},
	hits:{type:Number},
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
		bconfirmphone:000,
		bdescription:''+req.param("description"),
		blat:0,
		blong:0,
		bwebsite:''+req.param("website"),
		hits:0,
	   //pic:''+req.param("pic")       

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
	businessUser.findOneAndUpdate({buser:req.param("user")}, {hits:req.param("hits")},function(err){
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


http.createServer(app).listen(app.get('port'), function(){
	console.log('Port:' + app.get('port'))
});

