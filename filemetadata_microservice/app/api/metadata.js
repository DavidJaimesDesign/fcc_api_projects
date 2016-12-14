'use-strict'

module.exports = function(app, db) {	
	var multer = require('multer')
	app.get('/test', function(req ,res){
		res.send("api is connected to server")
	})
	
	app.post('/', multer({ dest: './uploads/'}).single('findSize'), function(req, res, next){

		var fileDetails = {
			name: req.file.originalname,
			size: req.file.size,
			date: new Date().toLocaleString(),
			file: req.file.filename
		}

		//we don't need to save to the db we just need the size 
		console.log(req.file)
		res.send(fileDetails)
	})

	
}
