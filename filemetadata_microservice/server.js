var express     = require('express')
var path        = require('path')
var MongoClient = require('mongodb').MongoClient
var routes      = require('./app/routes/index.js')
var api         = require('./app/api/metadata.js')

var db 

MongoClient.connect("your db here", function (err, database){
	if (err) throw err;
	db = database
	console.log("connected to filemetadata db")
		
	db.createCollection("files",{
		capped:true,
		size: 5242880
		max: 5000
	})

	routes(app, db)
	api(app, db)

	app.listen(process.env.PORT || 3000)
})
