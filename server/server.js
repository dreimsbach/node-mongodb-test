// MVC
var express = require('express');
var app = express();

var http = require('http');
var path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

var RecordDAO = require('./data');
var recordDao = new RecordDAO();

app.get('/save', function(req, res){
	var body = recordDao.save(
		{
	    artist: 'Bohren & der Club of Gore',
	    album: 'Piano Nights',
	    label: 'Pias',
	    year: 2013
	  }
	);

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body.artist));
  res.end(body.artist);
});


app.get('/find', function(req, res){
  recordDao.find({year: 2013}, function(result) {
		res.render('searchresult.jade', {'model' : result});
  });
});



app.listen(app.get('port'));




