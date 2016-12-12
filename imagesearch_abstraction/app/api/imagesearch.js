'use-strict'

module.exports = function(app, db){
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
		res.send(JSON.stringify(searchObject))
	}

	function handleHistory(req, res){
		db.collection('searchHistory').find().toArray(function(err, results) {
			if(err) throw err
			res.send(results)
		})
	}

	function searchGoogleApi(term){
		//http://cse.google.com/api/<USER_ID>/cse/<CSE_ID>
		//cse code: 008565534519775532346:s46klwoigd0
		//the first part is the user the second is the search engine ID
		//api key: AIzaSyBmixL6yXGQHN5H3YcNcUk6oE3bHDcKYdE

	}
} 
