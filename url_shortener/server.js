var express  = require('express')
var path     = require('path')
var shortid  = require('shortid')
var validURL = require('valid-url')
var app      = express()
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
app.listen(process.env.PORT || 3000)
