'use-strict'

module.exports = function(app, db){
	var cognitiveServices = require('cognitive-services')
		
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

		var searchResults = searchBingApi(searchTerm)
		
		res.send(JSON.stringify(searchResults))
	}

	function handleHistory(req, res){
		db.collection('searchHistory').find().toArray(function(err, results) {
			if(err) throw err
			res.send(results)
		})
	}

	function searchBingApi(term){
		var bingImageSearch = new cognitiveServices.bingImageSearch({
			API_KEY: "fa139232762046b59b1e286d9956580f"
		})

		const parameters = {
			q: term,
			count: "10",
			offset: "0",
			mkt: "en-us"
		}

		bingImageSearch.search({
			parameters
			})
			.then((response) => {
				return response
			})
			.catch((err) => {
				return ("Error not queried", err)
			})
	}

	function manageSearchResults(results){
	}

} 
