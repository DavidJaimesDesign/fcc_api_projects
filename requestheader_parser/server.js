var express = require('express')
var path    = require('path')
var app     = express()

app.get('/api/whoami/', function(req, res) {
	var ip      = req.connection.remoteAddress

	var user = {
			ip: ip,
			browser: req.headers['user-agent'].split(' ')[0],
			OS: req.headers['user-agent'].split(' ')[2] + req.headers['user-agent'].split(' ')[3]
		}
	
	res.send(JSON.stringify(user))
})

app.listen(process.env.PORT || 3000)
