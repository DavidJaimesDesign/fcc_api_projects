var express = require('express')
var path    = require('path')
var app     = express()

function requestheader(){
 	var header = {
			ip: "hacked", 
			browser: "chrome",
			OS: "pineapple"
		}
	
	return JSON.stringify(header)
}

app.get('/api/whoami/', function(req, res) {
	res.send(requestheader())
})

app.listen(process.env.PORT || 3000)
