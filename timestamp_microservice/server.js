var express = require('express')
var path = require('path')
var app = express()

function verifydate(date){
	var result = {
		unix: null,
		natural: null
	}
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"Novermber",
		"December"
	]
	if(Date.parse(date) > 1){
		var rawNaturalDate = new Date(Date.parse(date))
		var year      = rawNaturalDate.getFullYear();
		var month     = months[rawNaturalDate.getMonth()]
		var day       = rawNaturalDate.getDate();
		var cleanDate = month + " " + day + ", " + year 
		result.unix = Date.parse(date)
		result.natural = cleanDate
		return JSON.stringify(result)
	} else if(date > 0){
		result.unix = date
		var rawNaturalDate = new Date(date)
		var year      = rawNaturalDate.getFullYear();
		var month     = months[rawNaturalDate.getMonth()]
		var day       = rawNaturalDate.getDate();
		var cleanDate = month + " " + day + ", " + year 
		result.natural = cleanDate
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
