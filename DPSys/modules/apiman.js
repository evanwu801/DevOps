/**
 * New node file
 */
/**
 * New node file
 */
//var swig  = require('swig');
//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
//var db;
//var coll;
//var express = require('express');
//var router = express.Router();
var getHandler = {};
var postHandler = {};

console.log(config.get("DB_HOST"));
console.log(config.get("DB_PORT"));
console.log(config.get("DB_NAME"));
var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server(config.get("DB_HOST"),
		config.get("DB_PORT"),
		{ auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db(config.get("DB_NAME"), mongodbServer);

function list(req, res) {
var sendData = {};
	console.log("use api");
	db.open(function() {
		db.collection('api', function(err, collection){
			var cursor = collection.find({});
			cursor.each(function(err, doc){
				if(doc != null){
					console.log(doc);
					sendData[doc.apiName]= doc;
				} else{
					db.close();
					console.log(sendData);
					res.send(sendData);
				}
			});
		})
	});
}
getHandler["/list"]=list;

function listView(req, res) {
	var sendData = {};
		console.log("use api");
		db.open(function() {
			db.collection('api', function(err, collection){
				var cursor = collection.find({});
				cursor.each(function(err, doc){
					if(doc != null){
						console.log(doc);
						sendData[doc.apiName]= doc;
					} else{
						db.close();
						console.log(sendData);
						res.send(sendData);
					}
				});
			})
		});
	}
	getHandler["/listview"]=listView;

exports.getHandler = getHandler;
exports.postHandler = postHandler;
//exports.list = list;
//module.exports = router;