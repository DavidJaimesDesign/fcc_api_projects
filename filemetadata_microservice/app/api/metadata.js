'use-strict'

module.exports = function(app, db) {
	app.get('/test', function(req ,res){
		res.send("api is connected to server")
	})
}
