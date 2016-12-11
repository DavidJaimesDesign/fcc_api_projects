var express     = require('express')
var path        = require('path')
var shortid     = require('shortid')
var validURL    = require('valid-url')
var app         = express()
var MongoClient = require('mongodb').MongoClient
//helper functions

function IsURL(url) {
	if (validURL.isUri(url)){
		return true
	} else {
		return false
	} 
}

function generateUrlObject(url){
	var urlObject = {
			url: url,
			shorturl: "https://djd-urlshortener.herokuapp.com/" + shortid.generate()
			}
	return urlObject
}
//Connect to DB
var db

MongoClient.connect("mongodb://LeetDave:EasyPass13@ds127958.mlab.com:27958/djd-urlshortener",function(err, database){
	if (err) return console.log(err)
	db = database
	console.log("connected to the database")

	db.createCollection("sites", {
					capped: true,
					size: 5242880,
					max: 5000
					})
	app.listen(process.env.PORT || 3000)
	//API

	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/views/index.html'))
	});

	app.get('/new/*', function(req, res) {
		var url = req.params[0]
		var error = { error : "That isn't a valid URL."}
		if (IsURL(url)) {
			//here is where we post to the db
			var shortenedURL = generateUrlObject(url)
			db.collection('sites').save(shortenedURL, function(err, result){
				if (err) return console.log(err)
			})
			var returnURL = {
						url: shortenedURL.url,
						shortURL: shortenedURL.shorturl
					} 
			res.send(JSON.stringify(returnURL));
		} else {
			res.send(JSON.stringify(error))
		}
	});

	app.get('/:shorturl', function(req, res) {
		var shorturl = "https://djd-urlshortener.herokuapp.com/" + req.params.shorturl
		var error = { error: "That short url is not in DB"}
		db.collection('sites').findOne({"shorturl": shorturl},function(err, result){
			if (err) return console.log(err)
			if (result){
				console.log('Redirecting to ' + result.url)
				res.redirect(result.url)	
			}else{
				res.send(JSON.stringify(error) + shorturl)
			}
		})
	})
})



