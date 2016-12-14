'use-strict'
var multer      = require('multer')
var upload      = multer({dest: 'uploads/'})
module.exports = function(app, db) {
	app.get('/test', function(req ,res){
		res.send("api is connected to server")
	})
	
	app.post('/', upload.single('file'), function(req, res, next){
		res.send("file posted?")
	})
}
