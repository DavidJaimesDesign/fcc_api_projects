var express = require('express')
var path    = require('path')
var app     = express()

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/:url', function(req, res) {
	res.send("URL will be shortened")
});

app.listen(process.env.PORT || 3000)
