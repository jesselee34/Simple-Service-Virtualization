var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	res.render('index', {
		routes: [
			{ id: 1, url: '/Illustrations-Core/PolicyValues' },
			{ id: 2, url: '/Illustrations-Core/Presentation/PDF' }
		]
	});
});

router.get('/edit/:id', function(req, res){
	var route;

	if(req.params.id === 1){
		route = { id: 1, url: '/Illustrations-Core/PolicyValues' };
	} else {
		route = { id: 2, url: '/Illustrations-Core/Presentation/PDF' };
	}

	res.render('edit', {
		route: route
	});
});

module.exports = router;