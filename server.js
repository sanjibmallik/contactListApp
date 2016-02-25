var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

/*app.get('/', function(req, res){
    res.send("Hello server is running");
});*/
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

//FOR AUTHENTICATION TO USER LOGIN AND SIGN UP
app.post('/auth',function(req,res){
	console.log(req.body.name);
	console.log(req.body.password);
	var username = "sanjib";
	var password = "mallik";
	if ((req.body.name===username) && (req.body.password===password)){
		var result = true;
		res.json(result);
	}
	else{
		var result = false;
		res.json(result);
	}



});



app.get('/contactList', function(req, res){
    console.log("this is GET reqst");
    db.contactlist.find(function (err, docs){
        //console.log(docs);
        res.json(docs);
        
    });
    
    
    //dummmy data for testing purpose
    /* person1 = {
        name:'nandan',
        email : 'nandan@gmail.com',
        phone : '999999999'
        
    };
                 
    person2 = {
        name : 'sanjib',
        email : 'sanjib@gmail.com',
        phone : '997999999'
        
    };
    person3 = {
        name : 'namrta',
        email : 'namrata@gmail.com',
        phone : '990999999'
        
    };
   var contactlist = [person1,person2,person3];
    res.json(contactlist);*/
    
    
    console.log("I am sending your data");
});

app.post('/contactList', function(req, res){
    
    
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        console.log(doc);
        res.json(doc);
        
    });    
});

app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
    
});

app.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    	console.log(doc);
        res.json(doc);
    })
    
});

app.put('/contactList/:id', function(req, res){
    var id= req.body._id;
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.phone);
    console.log(id);
   db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, update:{$set: {name: req.body.name, email: req.body.email, phone:req.body.phone}},new: true}, function(err, doc){
    res.json(doc);
	});
   
    
    
});


app.listen(3000);
console.log("server running on port no 3000");