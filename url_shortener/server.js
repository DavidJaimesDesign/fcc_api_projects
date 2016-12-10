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
			shorturl: "http://wwww.djd-urlshortner.heroku.com/" + shortid.generate()
			}
	return urlObject
}
//Connect to DB
var db

MongoClient.connect("mongodb://LeetDave:EasyPass13@ds127958.mlab.com:27958/djd-urlshortener",function(err, database){
	if (err) return console.log(err)
	db = database
	app.listen(process.env.PORT || 3000)
})

//API

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/new/*', function(req, res) {
	var url = req.params[0]
	var error = { error : "That isn't a valid URL."}
	if (IsURL(url)) {
		res.send(JSON.stringify(generateUrlObject(url)));
	} else {
		res.send(JSON.stringify(error))
		}
});

app.get('/:shorturl', function(req, res) {
	//call if in database redirect to site else return error
})

app.post('/test', function(req, res){
	var testobject = {url: "potato", shorturl: "ptp"}
	db.collection('shorturls').save(testobject, function(err, result){
		if (err) return console.log(err)
		res.redirect('/')
	})
})

