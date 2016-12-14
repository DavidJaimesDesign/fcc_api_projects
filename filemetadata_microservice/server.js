var express     = require('express')
var path        = require('path')
var MongoClient = require('mongodb').MongoClient
var multer      = require('multer')
var bodyParser  = require('body-parser')
var routes      = require('./app/routes/index.js')
var api         = require('./app/api/metadata.js')
var app         = express()
var db 

MongoClient.connect("mongodb://LeetDave:EasyPass13@ds133398.mlab.com:33398/djd-filemetadata", function (err, database){
	if (err) throw err;
	db = database
	console.log("connected to filemetadata db")
		
	db.createCollection("files",{
		capped:true,
		size: 5242880,
		max: 5000
	})
	//app.use(bodyParser.json())
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'jade');

	routes(app, db)
	api(app, db)

	app.listen(process.env.PORT || 3000)
})
