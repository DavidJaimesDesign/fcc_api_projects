'use-strict'

module.exports = function(app, db){
	var Bing = require('node-bing-api')({accKey:"fa139232762046b59b1e286d9956580f"})		
	app.get('/api/imagesearch/:search', handleSearch)
	app.get('/api/search-history', handleHistory)

	function handleSearch(req, res){
		var offset       = req.query.offset
		var parsedOffset = parseOffset(offset)
		var searchTerm   = req.params.search
		var timesearched = new Date()	

		var searchObject = {
			searchTerm: searchTerm,
			dateSearched: timesearched
		}
		db.collection('searchHistory').save(searchObject, function(err, result){
			if (err) throw err
			console.log("saved" + result);
		})

		//res.send the query
	
		Bing.images(searchTerm, {
  			top: 10,
			skip: parsedOffset
  		}, function(error, body){
			res.send(cleanImg(body))
  		});
		
	}

	function handleHistory(req, res){
		db.collection('searchHistory').find().toArray(function(err, results) {
			if(err) throw err
			res.send(results)
		})
	}
	
	function cleanImg(body){
		var imgObj = JSON.parse(body.body)
		imgObj = imgObj.value
		var imageList = imgObj.map(makeimgObj)
		return imageList
	}

	function makeimgObj(img){
		return {
			"url": img.hostPageDisplayUrl,
			"snippet": img.name,
			"thumbnail": img.thumbnailUrl
			}
	}

	function parseOffset(offset){
		if(offset == {}) return 0
		if(isNaN(parseInt(offset))){ 
			return 0
		} else {
			return parseInt(offset)
		}
	}
	
} 
