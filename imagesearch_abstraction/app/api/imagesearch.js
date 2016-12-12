'use-strict'

module.exports = function(app, db){
	app.get('/api/imagesearch/:search', handleSearch)
	app.get('/api/search-history', handleHistory)

	function handleSearch(req, res){
		res.send("handle search connected")
	}

	function handleHistory(req, res){
		res.send("handle history connected")
	}
} 
