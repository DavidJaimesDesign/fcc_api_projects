'use-strict'

modules.exports = function(app) {
	app.route('/').get(function(req, res){
		res.render('index')
	})
}
