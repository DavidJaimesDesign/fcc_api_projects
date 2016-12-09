var express = require('express')
var path    = require('path')
var app     = express()

function verifyUrl(url){
	//returns true if valid false otherwise
}


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/:url', function(req, res) {
	var url = req.params.url
	var shortenedUrl = {	
	res.send("URL will be shortened")
});

app.listen(process.env.PORT || 3000)
