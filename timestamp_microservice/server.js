var express = require('express')
var path = require('path')
var app = express()

function verifydate(date){
	var result = {
		unix: null,
		natural: null
	}

	if(Date.parse(date) > 1){
		result.unix = Date.parse(date)
		result.natural = "Date converted"
		return JSON.stringify(result)
	}else {	
		return JSON.stringify(result)
	} 

}
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/:timestamp', function(req, res) {
	var timestamp = req.params.timestamp
	res.send("Timestamp: " + verifydate(timestamp) )
});
app.listen(3000, function(){
	console.log("example app listening on port 3000")
})
