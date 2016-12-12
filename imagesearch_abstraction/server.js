var express     = require('express')
var path        = require('path')
var MongoClient = require('mongodb').MongoClient
var routes      = require('./app/routes/index.js')
var api         = require('./app/api/imagesearch.js')
var app         = express()

var db 

MongoClient.connect("mongodb://LeetDave:EasyPass13@ds053186.mlab.com:53186/djd-imagesearch", function(err, database) {
	if(err) throw err;
	db = database
	console.log("connected to imagesearch db")
	
	app.use(express.static(__dirname + '/views'));
	
	db.createCollection("searchHistory",{
		capped: true,
		size: 5242880,
		max: 5000
	})
	
	routes(app, db)
	api(app, db) 
	
	app.listen(process.env.PORT || 3000)
})
