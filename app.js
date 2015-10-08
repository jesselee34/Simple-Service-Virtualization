var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressHandlebars = require('express-handlebars');
var path = require('path');

var app = express();

var routes = require('./routes/index');
var ui = require('./routes/ui');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/javascripts')));
app.use(express.static(path.join(__dirname, '/public/stylesheets')));

app.use('/Illustrations-Core/', routes);
app.use('/UI/', ui);

app.engine('hbs', expressHandlebars({
	extname: '.hbs',
	defaultLayout: 'main'
}));

app.set('view engine', 'hbs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = app;