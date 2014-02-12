// Mongod DB config
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    Binary = require('mongodb').Binary,
    async = require('async');

// Ignore the error alerts in jshint, as the following is required for Mongodb
/*jshint -W069, -W041*/
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;
/*jshint +W069, +W041*/

var db = new Db('Soaps_Dev', 
	new Server(host, port, 
		{ auto_reconnect: true,
			poolSize: 20}),
		{ w: 1 });

var messages;
var now = new Date();

exports.save_hero = function(req, callback) {
	async.waterfall([
		// 1. open the database connection
		function(cb) {
			console.log("Openning the database connection");
			db.open(cb);
		},

		// 2. Create collections 
		function(db, cb) {
			console.log("\nCreating the collections");
			db.createCollection("message", cb);
		},

		// 3. Verify that creating the a new collection with same name will cause an error
		function(message_coll, cb) {
			console.log("\nCreating a new collection with name conflict, expecting an error");
			messages = message_coll;
			db.createCollection("message", {strict: true}, function(err, results) {
				if (err) {
					console.log("\nEXPECTED error occurred");
					cb(null);
					return;
				} else {
					cb({error: "unexpected", message:"Name conflict of collection creation did not occur."});
				}
			});
		},

		// 4. Add the message 
		function(cb) {
			var message = {
				time: now,
				name: req.body.heroVolName,
				email: req.body.heroVolEmail,
				organisation: req.body.heroVolOrg,
				position: req.body.heroVolPos,
				phone: req.body.heroVolPhone,
				message: req.body.heroVolMsg
			};
			console.log("\nAdding the record.");
			messages.insert(message, {safe: true}, cb);
		}, 
		function(results, cb) {
			console.log("\nHero volunteer records added");
			console.log(results);

			// 5. Listing the results;
			messages.find().toArray(cb);

			// 6. Close the DB
			db.close();
		}
		], callback);
};


exports.save_gift = function(req, callback) {
	async.waterfall([
		// 1. open the database connection
		function(cb) {
			console.log("Openning the database connection");
			db.open(cb);
		},

		// 2. Create collections 
		function(db, cb) {
			console.log("\nCreating the collections");
			db.createCollection("corporate_gift", cb);
		},

		// 3. Verify that creating the a new collection with same name will cause an error
		function(message_coll, cb) {
			console.log("\nCreating a new collection with name conflict, expecting an error");
			messages = message_coll;
			db.createCollection("corporate_gift", {strict: true}, function(err, results) {
				if (err) {
					console.log("\nEXPECTED error occurred");
					cb(null);
					return;
				} else {
					cb({error: "unexpected", message:"Name conflict of collection creation did not occur."});
				}
			});
		},

		// 4. Add the message 
		function(cb) {
			var message = {
				time: now,
				name: req.body.corpName,
				email: req.body.corpEmail,
				organisation: req.body.corpOrg,
				position: req.body.corpPos,
				phone: req.body.corpPhone,
				message: req.body.corpMsg
			};
			console.log("\nAdding the record.");
			messages.insert(message, {safe: true}, cb);
		}, 
		function(results, cb) {
			console.log("\nCorporate gifts recored added");
			console.log(results);

			// 5. Listing the results;
			messages.find().toArray(cb);

			// 6. Close the DB
			db.close();
		}
		], callback);
};