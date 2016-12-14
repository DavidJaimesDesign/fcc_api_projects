'use-strict'
var multer      = require('multer')

var storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, '/my-uploads')
	},
	filename : function(req, file, cb){
		cb(null, file.filename + '-' + Date.now())
	}
})

var upload     = multer({storage: storage})
var uploadFile = upload.single('file')

module.exports = function(app, db) {
	app.get('/test', function(req ,res){
		res.send("api is connected to server")
	})
	
	app.post('/', upload.single('file'), function(req, res, next){
		uploadFile(req, res, function(err){
			if (err) throw err;
		})

		var fileDetails = {
			name: req.file.originalname,
			size: req.file.size,
			date: new Date().toLocaleString(),
			file: req.file.filename
		}

		//we don't need to save to the db we just need the size 

		res.send(fileDetails)
	})

	
}
