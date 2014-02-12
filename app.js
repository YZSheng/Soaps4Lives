
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./db.js');
var email = require('./email.js');
var app = express();



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:pagename', function(req, res) {
	res.render(req.params.pagename);
});

app.get('/', routes.index);

console.log('hello');


// Need to add error handling functionalities

function send_email_cb(error, response){
   if(error){
		console.log("\n\nAn error occurred when sending email");
		console.log(error);
		console.log("\n\n");
    } else {
		console.log("Message sent: " + response.message);
    }
}

function save_db_cb (err, results) {
	if (err) {
		console.log("There is an error");
		console.log(err);
	} else {
		console.log("All functions run successfully.");
	}
}

// Send an email for Hero Volunteer
app.post('/becomeHero', function(req, res) {
	email.hero_volunteer(req, res, send_email_cb);

	db.save_hero(req, save_db_cb);

	console.log("\n Request Body: ");
	console.log(req.body);
	console.log("\n\n");

	// Redirect to postmessage page
	res.render('postmessage.jade', {
			name: req.body.heroVolName,
			email: req.body.heroVolEmail,
			orgnisation: req.body.heroVolOrg,
			position: req.body.heroVolPos,
			phone: req.body.heroVolPhone,
			message: req.body.heroVolMsg
		});
	res.end();
});

// Send an email for Corp Gift
app.post('/corpGift', function(req, res) {
	email.corp_gift(req, res, send_email_cb);
	db.save_gift(req, save_db_cb);

	console.log("\n Request Body: ");
	console.log(req.body);
	console.log("\n\n");

	// Redirect to postmessage page
	res.render('postmessage.jade', {
			name: req.body.corpName,
			email: req.body.corpEmail,
			orgnisation: req.body.corpOrg,
			position: req.body.corpPos,
			phone: req.body.corpPhone,
			message: req.body.corpMsg
		});
	res.end();
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






