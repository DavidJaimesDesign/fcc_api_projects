'use-strict'

module.exports = function(app, db){
	var Bing = require('node-bing-api')({accKey:"fa139232762046b59b1e286d9956580f"})		
	app.get('/api/imagesearch/:search', handleSearch)
	app.get('/api/search-history', handleHistory)

	function handleSearch(req, res){
		var searchTerm = req.params.search
		var timesearched = new Date()	

		var searchObject = {
			searchTerm: searchTerm,
			dateSearched: timesearched
		}
		db.collection('searchHistory').save(searchObject, function(err, result){
			if (err) throw err
			console.log("saved" + result);
		})

		var searchResults = searchBingAPI(searchTerm)
		
		res.send(JSON.stringify(searchResults))
	}

	function handleHistory(req, res){
		db.collection('searchHistory').find().toArray(function(err, results) {
			if(err) throw err
			res.send(results)
		})
	}
	
	function searchBingAPI(term){
		Bing.images("Ninja Turtles", {
  			top: 15   // Number of results (max 50)  
  		}, function(error, res, body){
    		console.log(body)
  		});

	}
	function manageSearchResults(results){
	}

} 
