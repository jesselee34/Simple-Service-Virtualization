var express = require('express');
var router = express.Router();
var Storage = require('node-persist');
var DataModel = require('../models/DataModel');

Storage.initSync();

router.get('/', function(req, res){

	var names = Storage.values().map(function(item){
		return {
			id: item.id,
			name: item.name
		};
	});

	res.render('index', {
		vs: names
	});
});

router.get('/add', function(req, res){
	res.render('add');
});

router.post('/add', function(req, res){
	var model;

	try{
		model = DataModel(req.body.name, req.body.method, req.body.endpoint, req.body.requestBody, req.body.responseBody);
		model.save();
	}catch(e){
		console.log(e);

		res.render('error');
	}

	res.redirect('/UI/edit/' + model.id + '/success');
});

router.get('/edit/:id/:added?', function(req, res){
	var vs = DataModel(null, null, null, null, null, req.params.id);

	var added = req.params.added === 'success';

	res.render('edit', {
		added: added,
		vs: vs
	});
});

router.post('/edit/:id', function(req, res){
	var id = req.params.id;
	var vs = DataModel(req.body.name, req.body.method, req.body.endpoint, req.body.requestBody, req.body.responseBody);

	vs.id = id;

	vs.save();
});

module.exports = router;