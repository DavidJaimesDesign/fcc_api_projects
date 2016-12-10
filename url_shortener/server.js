var express  = require('express')
var path     = require('path')
var shortid  = require('shortid')
var validURL = require('valid-url') //this will help us validate the URL
var app      = express()

function IsURL(url) {
	return false;
 }

	
function generateUrl(){
	return "http://wwww.djd-urlshortner.heroku.com/" + shortid.generate();
}

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/new/:url', function(req, res) {
	var url = req.params.url
	var error = { error : "That isn't a valid URL."}
	if (IsURL(url)) {
		res.send("URL will be shortened" + generateUrl())
	} else {
		res.send(JSON.stringify(error))
		}
});

app.listen(process.env.PORT || 3000)
