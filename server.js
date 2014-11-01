var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
// var bat = require('./bat.js');
mongoose.connect('mongodb://localhost/mammals');
// app.use(express.static(__dirname + '/public'))
var db = mongoose.connection;
	db.on('error', console.error.bind(console, "connection errror"));
	db.once('open', function callback (){
	})
// db.use('mammals');
var app = express(); 
app.use(bodyParser.json());

var mammalSchema = new mongoose.Schema({
	name: String,
	type: String,
	year_extinct: Number
})

var Mammal = mongoose.model('Mammals', mammalSchema);

var mammalInstance = new Mammal({name: "bat"});

mammalInstance.save(function (err, mammalInstance){
	if(err) return console.error(err);
});

app.get('/mammals', function (req, res){
	Mammal.find(function (error, mammals){
	 	console.log("Get mammals....");
		try{
			res.json(mammals);
		}catch (error){
			res.status(404).send(error);
			};
	})
});

app.post('/mammals', function (req, res){
	var newMammal = new Mammal ({
		name: req.body.name,
		type: req.body.type,
		year_extinct: req.body.year_extinct
	});
	console.log(newMammal);
	newMammal.save(function (error, newMammal){
		if(error){
			return console.error(error);
		} else {
			res.send({success: true});
		};
	});
})





//var justOne = require('./data').justOne;



app.listen(3000);
