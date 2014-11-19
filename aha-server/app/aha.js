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
    buser:{type:String},
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
    hits:{type:Number}


})

//individuals schema definition
var individualSchema = new mongoose.Schema({
    iuser:{type:String},
    fname:{type:String},
    lname:{type:String},
    iphone:{type:String},
    ilat:{type:Number},
    ilong:{type:Number},
    hits:{type:Number}

})

//MODELS*************************
var businessUser = mongoose.model('BUser', businessSchema, "BUser" );
var individualUser = mongoose.model('IUser', individualSchema, "IUser");



//METHODS******************

//**Business User Methods**

//To register a Business
app.get('/registerbusiness', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.create({
        buser:''+req.param("buser"),
       

    }, function (err, fname, lname) {

      if(err){
        console.log(err);
        console.log("There's a problem with registering somewhere... Find it!");
        res.end("0");
      }
      else{
      console.log(bname + " has been added to the db");
      res.end("Registered");
    }
      

})

})


//To Find Business by Name
app.get('/authbusinessname', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
        //check if a user's password is valid like so:
       businessUser.findOne({ bname: ''+req.param("bname") }, function(err, user) {
            if (user.bname === (''+req.param("bname"))) {
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
//To check business username availability

//To set Business Coordinates

//To get Business info by Name
app.get('/getbusiness', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    businessUser.findOne({ buser: ''+req.param("uname") }, function(err, user) {
            res.send(user);
        }
    )
})

//To get Businesses info by Name
app.get('/getbusinesses', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    businessUser.find({ buser: ''+req.param("uname") }, function(err, user) {
            res.send(user);
        }
    )
})

//To retrieve all Businesses
app.get('/getallbusiness', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
    
    businessUser.find(function(err, businessUsers){
        res.send(businessUsers);
    })

})


//**Individual User Methods**

//To register an Individual
//To Find Individual by Name
//To check business username availability
//To set Individual Coordinates
//To get Individual info
app.get('/getindividual', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    individualUser.findOne({ iuser: ''+req.param("uname") }, function(err, user) {
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





//To retrieve Social Studies Subjects
app.get('/listss', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    socialTopic.find(function(err, topics){
        console.log("Working..");
        res.send(topics);
    })

})

//To retrieve by year

//To retrieve by Topic
app.get('/gettopic', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    passco.find({'topic': req.param("topic"), 'subject': req.param("subject")},function(err, passco1){
        console.log(req.param("topic")+ " " + req.param("subject") )
        res.send(passco1);
    })

})

//To insert
app.get('/insert', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST")

    passco.create({
        year: [{year:''+req.param("year"), session:''+req.param("month")}],
        subject:''+req.param("subject"),
        topic: ''+req.param("topic"),
        question: ''+req.param("question"),
        ans_a: ''+req.param("a1"),
        ans_b:''+req.param("a2"),
        ans_c:''+req.param("a3"),
        ans_d:''+req.param("a4"),
        ans_e: ''+req.param("a5"),
        answer: req.param("ans")

    }, function (err, year, subject, topic, question, ans_a, ans_b, ans_c, ans_d, ans_e, answer) {
      if(err){

        console.log(err);
        console.log("There's a problem somewhere... Find it!");
        
      }
      else{
      
    }
      

})

})

//USERS
//To add a user
app.get('/register', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.create({
        fname:''+req.param("fname"),
        lname: ''+req.param("lname"),
        username: ''+req.param("uname"),
        password: ''+req.param("pwd"),
       ssA: 0,
       ssB: 0,
       ssC: 0,
       ssTotal: 0,
        ssAMarks: 0,
        ssBMarks: 0,
        ssCMarks: 0

    }, function (err, fname, lname) {

      if(err){
        console.log(err);
        console.log("There's a problem with registering somewhere... Find it!");
        res.end("0");
      }
      else{
      console.log(fname + " " + lname + " has been added to the db");
      res.end("Registered");
    }
      

})

})

//To auth user
app.get('/auth', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
        //check if a user's password is valid like so:
        user.findOne({ username: ''+req.param("uname") }, function(err, user) {
            if (user.password === (''+req.param("pwd"))) {
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


//Retrieve a user and his/her marks
app.get('/getUser', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.findOne({ username: ''+req.param("uname") }, function(err, user) {
            res.send(user);
        }
    )
})


//Update marks
app.get('/setSSMarks', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.findOneAndUpdate({username:req.param("uname")}, {ssAMarks:req.param("A"),ssBMarks:req.param("B"), ssCMarks:req.param("C"), ssTotal:req.param("total")},function(err){
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

http.createServer(app).listen(app.get('port'), function(){
    console.log('Port:' + app.get('port'))
});
